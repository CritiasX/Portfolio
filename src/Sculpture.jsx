import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js'
import { createRenderScheduler } from './renderScheduler'
import { animationsEnabledByDefault } from './motionPreferences'

export default function Sculpture() {
  const [playing, setPlaying] = useState(animationsEnabledByDefault)
  const host = useRef(null), play = useRef(playing)
  const loopRef = useRef(null)
  const [failed, setFailed] = useState(false)
  useEffect(() => {
    const element = host.current
    let renderer
    try { renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' }) }
    catch { setFailed(true); return }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, window.innerWidth < 700 ? 1 : 1.25))
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    element.appendChild(renderer.domElement)
    const scene = new THREE.Scene(), camera = new THREE.PerspectiveCamera(36, 1, .1, 100)
    camera.position.set(5.4, 3.5, 7.5); camera.lookAt(0, .1, 0)
    const sculpture = new THREE.Group(); scene.add(sculpture)
    const mint = new THREE.MeshPhysicalMaterial({ color: '#d8dbd2', metalness: .27, roughness: .24, clearcoat: 1 })
    const deep = new THREE.MeshStandardMaterial({ color: '#06171d', metalness: .6, roughness: .26 })
    const silver = new THREE.MeshStandardMaterial({ color: '#b8c3c7', metalness: .85, roughness: .23 })
    const clay = new THREE.MeshStandardMaterial({ color: '#4f6c7a', metalness: .2, roughness: .24 })
    const bright = new THREE.MeshPhysicalMaterial({ color: '#eeece2', metalness: .12, roughness: .19, clearcoat: 1 })
    const blockGeometry = new RoundedBoxGeometry(1.8, .52, 1.8, 4, .12), blocks = []
    for (let i = 0; i < 3; i++) {
      const block = new THREE.Mesh(blockGeometry, i === 1 ? deep : mint)
      block.position.y = (i - 1) * .72; block.rotation.y = i * .13; sculpture.add(block); blocks.push(block)
      const line = new THREE.Mesh(new THREE.BoxGeometry(.65, .025, .012), i === 1 ? bright : deep)
      line.position.set(0, 0, .901); block.add(line)
      const indicator = new THREE.Mesh(new THREE.SphereGeometry(.04, 12, 8), i === 1 ? clay : bright)
      indicator.position.set(.65, .02, .91); block.add(indicator)
    }
    const orbit = new THREE.Group(); orbit.rotation.set(.6, .15, -.4); sculpture.add(orbit)
    orbit.add(new THREE.Mesh(new THREE.TorusGeometry(1.98, .028, 8, 96), silver))
    const satellite = new THREE.Mesh(new THREE.SphereGeometry(.25, 24, 16), clay)
    satellite.position.set(1.98, 0, 0); orbit.add(satellite)
    const outer = new THREE.Mesh(new THREE.TorusGeometry(2.35, .009, 6, 96), mint)
    outer.rotation.set(1.1, .2, .5); sculpture.add(outer)
    const top = new THREE.Mesh(new THREE.IcosahedronGeometry(.38, 0), bright)
    top.position.set(.4, 1.75, -.1); top.rotation.set(.1, .4, .2); sculpture.add(top)
    const dot = new THREE.Mesh(new THREE.SphereGeometry(.09, 20, 16), deep)
    dot.position.set(-1.8, 1.2, .8); sculpture.add(dot)
    scene.add(new THREE.HemisphereLight('#ffffff', '#7f939b', 3))
    const key = new THREE.DirectionalLight('#fff8e7', 5); key.position.set(-3, 6, 5); scene.add(key)
    const rim = new THREE.DirectionalLight('#d6e6f2', 4); rim.position.set(5, 2, -4); scene.add(rim)
    let x = 0, y = 0, elapsed = 0, contextIsLost = false
    const siteMotion = (event) => {
      play.current = Boolean(event.detail.enabled)
      setPlaying(play.current)
      loopRef.current?.setAnimating(play.current)
      loopRef.current?.invalidate()
    }
    window.addEventListener('portfolio:motion', siteMotion)
    const move = (event) => { const r = element.getBoundingClientRect(); x = (event.clientX - r.left) / r.width - .5; y = (event.clientY - r.top) / r.height - .5 }
    const reset = () => { x = 0; y = 0 }
    element.addEventListener('pointermove', move); element.addEventListener('pointerleave', reset)
    const lost = (event) => { event.preventDefault(); contextIsLost = true; loopRef.current?.dispose(); setFailed(true) }
    renderer.domElement.addEventListener('webglcontextlost', lost)
    const resize = new ResizeObserver(() => {
      const { width, height } = element.getBoundingClientRect(); if (!width || !height || contextIsLost) return
      renderer.setSize(width, height); camera.aspect = width / height
      camera.position.set(5.4, 3.5, 7.5).multiplyScalar(Math.max(1, 1.05 / camera.aspect)); camera.updateProjectionMatrix()
      loopRef.current?.invalidate()
    }); resize.observe(element)
    const observer = new IntersectionObserver(([entry]) => { loopRef.current?.setVisible(entry.isIntersecting) }); observer.observe(element)
    const loop = createRenderScheduler((_time, delta) => {
      if (contextIsLost) return
      const animated = play.current
      if (animated) elapsed += delta
      const t = elapsed
      sculpture.rotation.y += ((animated ? x * .3 + Math.sin(t * .17) * .15 : 0) - sculpture.rotation.y) * .05
      sculpture.rotation.x += ((animated ? y * .15 : 0) - sculpture.rotation.x) * .05
      blocks.forEach((block, i) => { block.position.y = (i - 1) * .72 + (animated ? Math.sin(t * 1.15 + i * .7) * .07 : 0) })
      orbit.rotation.z = -.4 + t * .2; top.position.y = 1.75 + (animated ? Math.sin(t * 1.1) * .1 : 0); top.rotation.y = .4 + t * .32
      renderer.render(scene, camera)
    }, { maxFps: 30 })
    loopRef.current = loop
    loop.setVisible(false)
    loop.setAnimating(play.current)
    loop.invalidate()
    return () => {
      loop.dispose(); loopRef.current = null; resize.disconnect(); observer.disconnect()
      window.removeEventListener('portfolio:motion', siteMotion)
      element.removeEventListener('pointermove', move); element.removeEventListener('pointerleave', reset); renderer.domElement.removeEventListener('webglcontextlost', lost)
      const geometries = new Set(), materials = new Set()
      scene.traverse((object) => { if (object.geometry) geometries.add(object.geometry); if (object.material) materials.add(object.material) })
      geometries.forEach((geometry) => geometry.dispose()); materials.forEach((material) => material.dispose())
      renderer.dispose(); renderer.domElement.remove()
    }
  }, [])
  return <div className="sculpture-wrap"><div ref={host} className={`sculpture${failed ? ' scene-failed' : ''}`} role="img" aria-label="Three floating data blocks with metallic orbits and a polished slate satellite">{failed && <div className="scene-placeholder"><div className="fallback-orbit"/><span>CONNECTING THE DOTS</span></div>}</div>{!failed && <button className="scene-pause" onClick={() => { const next = !play.current; play.current = next; setPlaying(next); loopRef.current?.setAnimating(next); loopRef.current?.invalidate() }} aria-label={playing ? 'Pause 3D animation' : 'Play 3D animation'}>{playing ? 'Ⅱ' : '▷'}</button>}</div>
}


