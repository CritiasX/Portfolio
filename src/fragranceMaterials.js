import * as THREE from 'three'

/*
 * Small, object-space extensions to Three's MeshPhysicalMaterial pipeline.
 * PBR lighting, environment BRDF, shadow reception, and color management remain
 * Three's own shaders. Checked against Three 0.186.1 ShaderLib.physical.
 *
 * Uniforms (linear color space):
 * - uFragranceTop/Bottom + Height: a liquid's vertical absorption/tint gradient.
 * - uFragranceAbsorption: increased optical path absorption at grazing angles.
 * - uFragranceEdge/EdgeGain: a restrained Fresnel glint over the physical BRDF.
 * - uFragranceEdgeAlpha: stronger opacity at the edges of the clear glass shell.
 * - uFragranceGrain/Roughness/Normal: stable object-space micro surface detail.
 * Surface kinds: smooth glass, leather sleeve grain, or crossed cap knurling.
 * No time uniforms or post-processing passes; stationary scenes need no redraw.
 */
export function createSurfaceMaterial(parameters = {}, optical = {}) {
  const {
    top = '#ffffff', bottom = '#ffffff', edge = '#ffffff',
    height = [-1, 1], absorption = 0, edgeGain = 0,
    edgeAlpha = 0, grain = 0, microRoughness = 0, microNormal = 0,
    kind = 'smooth',
  } = optical
  const material = new THREE.MeshPhysicalMaterial(parameters)
  // Smooth bottle surfaces keep the optical shader but skip procedural grain and
  // derivative normal work entirely. Only leather/knurled caps pay that cost.
  const hasDetail = kind !== 'smooth' && (microRoughness > 0 || microNormal > 0)
  const hasNormalDetail = hasDetail && microNormal > 0
  const uniforms = {
    uFragranceTop: { value: new THREE.Color(top) },
    uFragranceBottom: { value: new THREE.Color(bottom) },
    uFragranceEdge: { value: new THREE.Color(edge) },
    uFragranceHeight: { value: new THREE.Vector2(...height) },
    uFragranceAbsorption: { value: absorption },
    uFragranceEdgeGain: { value: edgeGain },
    uFragranceEdgeAlpha: { value: edgeAlpha },
    uFragranceGrain: { value: grain },
    uFragranceRoughness: { value: microRoughness },
    uFragranceNormal: { value: microNormal },
  }
  material.userData.fragranceUniforms = uniforms
  material.userData.fragranceSurface = kind
  material.customProgramCacheKey = () => `fragrance-physical-v4-${kind}-${hasDetail}-${hasNormalDetail}`
  material.onBeforeCompile = (shader) => {
    Object.assign(shader.uniforms, uniforms)
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', '#include <common>\nvarying vec3 vFragranceLocal;')
      .replace('#include <begin_vertex>', '#include <begin_vertex>\nvFragranceLocal = position;')
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', `#include <common>
        varying vec3 vFragranceLocal;
        uniform vec3 uFragranceTop;
        uniform vec3 uFragranceBottom;
        uniform vec3 uFragranceEdge;
        uniform vec2 uFragranceHeight;
        uniform float uFragranceAbsorption;
        uniform float uFragranceEdgeGain;
        uniform float uFragranceEdgeAlpha;
        uniform float uFragranceGrain;
        uniform float uFragranceRoughness;
        uniform float uFragranceNormal;
        float fragranceHash(vec3 p) {
          p = fract(p * 0.1031);
          p += dot(p, p.yzx + 33.33);
          return fract((p.x + p.y) * p.z);
        }
        float fragranceSurfaceHeight(vec3 p) {
          ${kind === 'knurl' ? `
            float angle = atan(p.z, p.x);
            float crossed = sin(angle * 48.0 + p.y * 190.0) * sin(angle * 48.0 - p.y * 190.0);
            float footprint = max(fwidth(angle * 48.0), fwidth(p.y * 190.0));
            float filterWeight = 1.0 - smoothstep(0.7, 2.8, footprint);
            return 0.5 + 0.5 * crossed * filterWeight;
          ` : `vec3 grid = p * max(uFragranceGrain, 0.001);
            float aa = 1.0 - smoothstep(0.6, 1.8, length(fwidth(grid)));
            return 0.5 + (fragranceHash(floor(grid)) - 0.5) * aa;`}
        }
        vec3 fragranceBump(vec3 viewPosition, vec3 surfaceNormal, float detailHeight) {
          vec3 dx = normalize(dFdx(viewPosition));
          vec3 dy = normalize(dFdy(viewPosition));
          vec3 r1 = cross(dy, surfaceNormal);
          vec3 r2 = cross(surfaceNormal, dx);
          float determinant = dot(dx, r1);
          vec3 gradient = sign(determinant) * (dFdx(detailHeight) * r1 + dFdy(detailHeight) * r2);
          return normalize(max(abs(determinant), 0.0001) * surfaceNormal - uFragranceNormal * gradient);
        }
      `)
      .replace('#include <color_fragment>', `#include <color_fragment>
        float fragranceHeight = clamp((vFragranceLocal.y - uFragranceHeight.x) / max(uFragranceHeight.y - uFragranceHeight.x, 0.001), 0.0, 1.0);
        vec3 fragranceTint = mix(uFragranceBottom, uFragranceTop, smoothstep(0.03, 0.97, fragranceHeight));
        diffuseColor.rgb *= fragranceTint;
      `)
      .replace('#include <roughnessmap_fragment>', `#include <roughnessmap_fragment>
        ${hasDetail ? `
          float fragranceDetail = fragranceSurfaceHeight(vFragranceLocal);
          roughnessFactor = clamp(roughnessFactor + (fragranceDetail - 0.5) * uFragranceRoughness, 0.045, 1.0);
        ` : ''}
      `)
      .replace('#include <normal_fragment_maps>', `#include <normal_fragment_maps>
        ${hasNormalDetail ? 'normal = fragranceBump(-vViewPosition, normal, fragranceDetail);' : ''}
        float fragranceFacing = clamp(abs(dot(normal, normalize(vViewPosition))), 0.0, 1.0);
        float fragranceFresnel = pow(1.0 - fragranceFacing, 3.0);
        float fragrancePath = 1.0 / max(fragranceFacing, 0.22) - 1.0;
        diffuseColor.rgb *= exp(-uFragranceAbsorption * fragrancePath * (vec3(1.0) - fragranceTint * 0.68));
        diffuseColor.a = clamp(diffuseColor.a + fragranceFresnel * uFragranceEdgeAlpha, 0.0, 1.0);
      `)
      .replace('#include <opaque_fragment>', `
        outgoingLight += uFragranceEdge * fragranceFresnel * uFragranceEdgeGain;
        #include <opaque_fragment>
      `)
  }
  return material
}

/** A superellipse cross-section gives the flask a broad, gently bowed face. */
const widthProfile = [[0,.69],[.035,.86],[.11,.98],[.28,1.02],[.58,1],[.83,.96],[.94,.88],[1,.73]]
function profileAt(t) {
  const pair = widthProfile.findIndex(([height]) => height >= t)
  if (pair <= 0) return widthProfile[0][1]
  const [a, av] = widthProfile[pair - 1], [b, bv] = widthProfile[pair]
  const f = THREE.MathUtils.smoothstep((t - a) / (b - a), 0, 1)
  return THREE.MathUtils.lerp(av, bv, f)
}
function depthAt(t) { return .78 + .22 * Math.sin(Math.PI * THREE.MathUtils.clamp(t, 0, 1)) }

export function flaskFrontZ(x, y, width, height, depth) {
  const t = THREE.MathUtils.clamp(y / height + .5, 0, 1)
  const rx = width * .5 * profileAt(t)
  return depth * .5 * depthAt(t) * Math.pow(Math.max(0, 1 - Math.pow(Math.min(Math.abs(x) / rx, 1), 2 / .47)), .35)
}

/** Closed curved flask with a narrower shoulder and rounded, wider lower belly. */
export function createFlaskGeometry(width, height, depth, radialSegments = 48, heightSegments = 24, range = [0, 1]) {
  const positions = [], uvs = [], indices = []
  for (let row = 0; row <= heightSegments; row++) {
    const t = THREE.MathUtils.lerp(range[0], range[1], row / heightSegments)
    const rx = width * .5 * profileAt(t), rz = depth * .5 * depthAt(t)
    for (let side = 0; side <= radialSegments; side++) {
      const angle = side / radialSegments * Math.PI * 2
      const c = Math.cos(angle), s = Math.sin(angle)
      positions.push(Math.sign(c) * Math.pow(Math.abs(c), .47) * rx, (t - .5) * height, Math.sign(s) * Math.pow(Math.abs(s), .7) * rz)
      uvs.push(side / radialSegments, t)
    }
  }
  for (let row = 0; row < heightSegments; row++) for (let side = 0; side < radialSegments; side++) {
    const a = row * (radialSegments + 1) + side, b = a + radialSegments + 1
    indices.push(a, b, b + 1, a, b + 1, a + 1)
  }
  for (const top of [false, true]) {
    const center = positions.length / 3
    positions.push(0, ((top ? range[1] : range[0]) - .5) * height, 0); uvs.push(.5, .5)
    const start = top ? heightSegments * (radialSegments + 1) : 0
    for (let side = 0; side < radialSegments; side++) {
      if (top) indices.push(center, start + side + 1, start + side)
      else indices.push(center, start + side, start + side + 1)
    }
  }
  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2))
  geometry.setIndex(indices)
  geometry.computeVertexNormals(); geometry.computeBoundingBox(); geometry.computeBoundingSphere()
  return geometry
}

/** The clear ink decal conforms to the bowed glass rather than a flat image plane. */
export function createFlaskPrintGeometry(width, height, depth) {
  const positions = [], uvs = [], indices = [], columns = 16, rows = 20
  for (let row = 0; row <= rows; row++) for (let col = 0; col <= columns; col++) {
    const u = col / columns, v = row / rows
    const y = (v - .5) * height * .93
    const x = (u - .5) * width * .81 * profileAt(v * .93 + .035)
    positions.push(x, y, flaskFrontZ(x, y, width, height, depth) + .005)
    uvs.push(u, v)
  }
  for (let row = 0; row < rows; row++) for (let col = 0; col < columns; col++) {
    const a = row * (columns + 1) + col, b = a + columns + 1
    indices.push(a, a + 1, b + 1, a, b + 1, b)
  }
  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2)); geometry.setIndex(indices)
  geometry.computeVertexNormals(); geometry.computeBoundingBox(); geometry.computeBoundingSphere()
  return geometry
}



/**
 * A shallow curved meniscus follows the liquid volume's actual cross-section.
 * The outer edge rises slightly; no unrelated front-facing wire outline is used.
 */
export function createFlaskMeniscusGeometry(width, height, depth, fill = .92, radialSegments = 48) {
  const positions = [], uvs = [], indices = []
  const rx = width * .5 * profileAt(fill), rz = depth * .5 * depthAt(fill)
  const y = (fill - .5) * height
  for (let ring = 0; ring < 3; ring++) {
    const radius = .94 + ring * .03
    for (let side = 0; side <= radialSegments; side++) {
      const angle = side / radialSegments * Math.PI * 2
      const c = Math.cos(angle), s = Math.sin(angle)
      positions.push(Math.sign(c) * Math.pow(Math.abs(c), .47) * rx * radius, y + .003 + ring * ring * .0018, Math.sign(s) * Math.pow(Math.abs(s), .7) * rz * radius)
      uvs.push(side / radialSegments, ring / 2)
    }
  }
  for (let ring = 0; ring < 2; ring++) for (let side = 0; side < radialSegments; side++) {
    const a = ring * (radialSegments + 1) + side, b = a + radialSegments + 1
    indices.push(a, a + 1, b + 1, a, b + 1, b)
  }
  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2)); geometry.setIndex(indices)
  geometry.computeVertexNormals(); geometry.computeBoundingBox(); geometry.computeBoundingSphere()
  return geometry
}

