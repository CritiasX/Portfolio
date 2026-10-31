import { useEffect, useRef, useState } from 'react'
import { LuPause, LuPlay, LuRotateCcw, LuRotateCw } from 'react-icons/lu'
import * as THREE from 'three'
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js'
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js'
import { createSurfaceMaterial, createFlaskGeometry, createFlaskPrintGeometry, createFlaskMeniscusGeometry } from './fragranceMaterials'
import { createRenderScheduler } from './renderScheduler'
import './FragranceGallery.css'

const fragrances = [
  { name: 'Hawas Ice', color: '#6daccf', tone: 'ice', number: '01', detail: 'Blue glass, ice-white cap. A favorite in the collection.' },
  { name: 'CDN Iconic', color: '#173dc3', tone: 'blue', number: '02', detail: 'Royal blue, fine silver lines, and the signature medallion.' },
  { name: 'Odyssey Mega', color: '#e1cc37', tone: 'yellow', number: '03', detail: 'The yellow canteen with a little extra character.' },
  { name: 'CDNIM', color: '#15181e', tone: 'black', number: '04', detail: 'Black glass, silver details. A familiar favorite.' },
]

function canvasTexture(draw, width = 512, height = 768) {
  const canvas = document.createElement('canvas')
  canvas.width = width; canvas.height = height
  const context = canvas.getContext('2d')
  context.scale(.5,.5)
  draw(context, width * 2, height * 2)
  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  return texture
}

function faceTexture(kind) {
  return canvasTexture((ctx, w, h) => {
    ctx.textAlign = 'center'
    if (kind === 'hawas') {
      ctx.fillStyle = '#edfaff'
      ctx.font = '90px serif'; ctx.fillText('حواس', w / 2, h * .33)
      ctx.font = '110px Georgia,serif'; ctx.fillText('HAWAS', w / 2, h * .43)
      ctx.font = '32px sans-serif'; ctx.fillText('For Him', w / 2, h * .47)
      ctx.font = 'bold 58px sans-serif'; ctx.fillText('I C E', w / 2, h * .59)
      ctx.font = 'italic 36px Georgia,serif'; ctx.fillText('Rasasi', w / 2, h * .87)
      return
    }
    if (kind === 'iconic') {
      ctx.strokeStyle = '#b8b7a2'; ctx.lineWidth = 3.8
      ctx.save(); ctx.translate(w * .48, h * .46); ctx.rotate(-.35)
      for (let i = 0; i < 12; i++) {
        ctx.beginPath(); ctx.ellipse(i * -15, i * 12, 145 + i * 44, 215 + i * 60, i * .048, 0, Math.PI * 2); ctx.stroke()
      }
      ctx.restore()
      ctx.fillStyle = '#edf0eb'; ctx.font = '48px sans-serif'; ctx.fillText('club de nuit', w * .53, h * .88)
      ctx.font = '47px sans-serif'; ctx.fillText('iconic', w * .69, h * .925)
      return
    }
    ctx.fillStyle = '#eceeea'; ctx.font = '52px sans-serif'; ctx.fillText('club de nuit', w * .48, h * .9)
    ctx.font = '24px sans-serif'; ctx.fillText('intense man', w * .77, h * .93)
  })
}

function megaTexture() {
  return canvasTexture((ctx, w, h) => {
    ctx.fillStyle = '#d9bd13'; ctx.fillRect(0, 0, w, h)
    ctx.strokeStyle = '#50491f'; ctx.lineWidth = 2.4; ctx.setLineDash([13, 6])
    for (const y of [35, h - 35]) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke() }
    ctx.setLineDash([]); ctx.textAlign = 'center'; ctx.fillStyle = '#8d7612'
    ctx.font = '42px sans-serif'; ctx.fillText('O D Y S S E Y', w / 2, h * .46)
    ctx.font = '76px sans-serif'; ctx.fillText('MEGA', w / 2, h * .57)
    ctx.font = '34px Georgia,serif'; ctx.fillText('EAU DE PARFUM', w / 2, h * .64)
    ctx.font = '29px sans-serif'; ctx.fillText('LIMITED EDITION', w / 2, h * .86)
  }, 1024, 512)
}

function addInstances(group, geometry, material, details) {
  const mesh = new THREE.InstancedMesh(geometry, material, details.length)
  const transform = new THREE.Object3D()
  details.forEach(({ position, rotation = [0,0,0], scale = 1 }, index) => {
    transform.position.set(...position)
    transform.rotation.set(...rotation)
    transform.scale.setScalar(scale)
    transform.updateMatrix()
    mesh.setMatrixAt(index, transform.matrix)
  })
  mesh.computeBoundingSphere()
  group.add(mesh)
  return mesh
}

function chainAndMedallion(group, blackFace, metal, blackMaterial, z) {
  const linkGeometry = new THREE.TorusGeometry(.025, .007, 4, 10)
  addInstances(group,linkGeometry,metal,Array.from({length:14},(_,i)=>({
    position:[.055+Math.sin(i*.6)*.006,1.77-i*.042,z],rotation:[0,i%2?Math.PI/2.8:0,0],
  })))
  const medal = new THREE.Mesh(new THREE.CylinderGeometry(.207, .207, .035, 32), blackFace ? blackMaterial : metal)
  medal.rotation.x = Math.PI / 2; medal.position.set(.055, 1.02, z + .014); group.add(medal)
  const rim = new THREE.Mesh(new THREE.TorusGeometry(.207, .009, 5, 32), metal)
  rim.position.set(.055, 1.02, z + .035); group.add(rim)
  const wordmark = canvasTexture((ctx, w, h) => {
    ctx.fillStyle = blackFace ? '#58616a' : '#68747d'; ctx.textAlign = 'center'; ctx.font = '46px Georgia,serif'; ctx.fillText('ARMAF', w / 2, h / 2 + 17)
  }, 256, 256)
  const imprint = new THREE.Mesh(new THREE.CircleGeometry(.19, 24), new THREE.MeshBasicMaterial({ map: wordmark, transparent: true, depthWrite: false }))
  imprint.position.set(.055, 1.02, z + .034); group.add(imprint)
  const gem = new THREE.Mesh(new THREE.IcosahedronGeometry(.03, 0), metal)
  gem.position.set(.19, .91, z + .045); group.add(gem)
}

function studdedCap(group, blackCap, chrome, blackMaterial) {
  const cap = new THREE.Mesh(new RoundedBoxGeometry(.76, .44, .62, 2, .012), blackCap ? blackMaterial : chrome)
  cap.position.y = 2.09; group.add(cap)
  const gemGeometry = new THREE.IcosahedronGeometry(.035, 0)
  const details=[]
  for (const x of [-.31, .31]) for (const y of [1.94, 2.24]) {
    details.push({position:[x,y,.316]})
  }
  for (const z of [-.245, .245]) {
    details.push({position:[-.385,2.23,z]})
  }
  addInstances(group,gemGeometry,chrome,details)
}

// Geometry and procedural textures follow James's supplied reference photographs.
// These are lightweight approximations rather than scanned product models.

function addIceCap(group, chrome) {
  const ice = createSurfaceMaterial({ color:'#f1f3ee', roughness:.28, metalness:.08, clearcoat:.35, envMapIntensity:.65 }, { kind:'knurl', grain:1, microRoughness:.1, microNormal:.24, edgeGain:.015, edge:'#ffffff' })
  const neck = new THREE.Mesh(new THREE.CylinderGeometry(.22,.265,.14,32),chrome)
  neck.position.y = 1.98; group.add(neck)
  const cap = new THREE.Mesh(new THREE.CylinderGeometry(.295,.235,.48,48,2),ice)
  cap.position.y = 2.245; group.add(cap)
  const ringGeometry = new THREE.TorusGeometry(.3,.031,6,40)
  addInstances(group,ringGeometry,ice,Array.from({length:4},(_,i)=>({
    position:[0,2.46-i*.071,0],rotation:[Math.PI/2,0,0],scale:1-i*.012,
  })))
  // A raised flourish over the lower smooth portion of the tapered cap.
  const flourish = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3([
    new THREE.Vector3(-.17,2.15,.244),new THREE.Vector3(-.13,2.10,.254),new THREE.Vector3(-.02,2.12,.257),
    new THREE.Vector3(.11,2.19,.25),new THREE.Vector3(.17,2.17,.244),
  ]),16,.009,4,false),ice)
  group.add(flourish)
}

function createBottle(index) {
  const group = new THREE.Group()
  const chrome = createSurfaceMaterial({color:'#dce1e4',metalness:.95,roughness:.16,envMapIntensity:1.1},{grain:140,microRoughness:.055,microNormal:.025,edgeGain:.025})
  const black = createSurfaceMaterial({color:'#11151c',metalness:.17,roughness:.19,clearcoat:.65,clearcoatRoughness:.12,envMapIntensity:.85},{grain:75,microRoughness:.025,edgeGain:.025,edge:'#b1c2d1'})
  if(index===0) {
    const shell = new THREE.Mesh(createFlaskGeometry(1.25,1.8,.70),createSurfaceMaterial({
      color:'#ffffff',roughness:.09,metalness:0,clearcoat:.75,clearcoatRoughness:.08,
      transparent:true,opacity:.035,depthWrite:false,envMapIntensity:.9,
    },{ top:'#f3fafb',bottom:'#3c9ccc',height:[-.9,.9],absorption:.18,edge:'#d7efff',edgeGain:.34,edgeAlpha:.73,grain:80,microRoughness:.008 }))
    shell.position.y=1.035; shell.renderOrder=3; group.add(shell)
    // One continuous liquid volume reaches the rounded bottom. Alpha blending
    // keeps it translucent without the extra framebuffer pass of transmission.
    const liquidMaterial=new THREE.MeshBasicMaterial({
      color:'#91dcfa',transparent:true,opacity:.62,depthWrite:false,toneMapped:false,
    })
    const core = new THREE.Mesh(createFlaskGeometry(1.08,1.8,.50,48,24,[.025,.92]),liquidMaterial)
    core.position.y=1.035; core.renderOrder=2; group.add(core)
    const meniscus = new THREE.Mesh(createFlaskMeniscusGeometry(1.08,1.8,.50,.92),new THREE.MeshBasicMaterial({
      color:'#b8ecff',transparent:true,opacity:.3,depthWrite:false,toneMapped:false,
    }))
    meniscus.position.y=1.035; meniscus.renderOrder=2.1; group.add(meniscus)
    const print = new THREE.Mesh(createFlaskPrintGeometry(1.25,1.8,.70),new THREE.MeshBasicMaterial({map:faceTexture('hawas'),transparent:true,depthWrite:false,toneMapped:false,polygonOffset:true,polygonOffsetFactor:-1}))
    print.position.y=1.035; print.renderOrder=4; group.add(print)
    addIceCap(group,chrome)
  } else if(index===2) {
    const yellowMap=megaTexture()
    const leather=createSurfaceMaterial({color:'#ffffff',map:yellowMap,roughness:.68,metalness:0,envMapIntensity:.32},
      {kind:'leather',height:[-.815,.815],top:'#fffce7',bottom:'#dac674',grain:105,microRoughness:.26,microNormal:.22,edgeGain:.012,edge:'#f5e187'})
    const body=new THREE.Mesh(new THREE.CylinderGeometry(.58,.58,1.63,48,2),leather)
    body.position.y=.95; body.rotation.y=Math.PI; group.add(body)
    const bandMaterial=createSurfaceMaterial({color:'#d2ba20',roughness:.72,envMapIntensity:.28},
      {kind:'leather',grain:105,microRoughness:.24,microNormal:.18,edgeGain:.01,edge:'#f6e18c'})
    const band=new THREE.Mesh(new THREE.CylinderGeometry(.594,.594,.29,48,1),bandMaterial)
    band.position.y=1.39; group.add(band)
    const keeper=new THREE.Mesh(new RoundedBoxGeometry(.13,.34,.04,3,.012),bandMaterial)
    keeper.position.set(.025,1.39,.608); group.add(keeper)
    const seamMaterial=new THREE.MeshStandardMaterial({color:'#77601e',roughness:.85})
    const seamGeometry=new THREE.TorusGeometry(.581,.009,4,48)
    addInstances(group,seamGeometry,seamMaterial,[.155,1.746].map(y=>({position:[0,y,0],rotation:[Math.PI/2,0,0]})))
    const shoulder=new THREE.Mesh(new THREE.CylinderGeometry(.47,.55,.22,40),black)
    shoulder.position.y=1.87; group.add(shoulder)
    const cap=new THREE.Mesh(new THREE.CylinderGeometry(.44,.44,.43,40,1),black)
    cap.position.y=2.16; group.add(cap)
    const lip=new THREE.Mesh(new THREE.TorusGeometry(.443,.014,5,40),black)
    lip.rotation.x=Math.PI/2; lip.position.y=2.365; group.add(lip)
    const handlePath=new THREE.CatmullRomCurve3([
      new THREE.Vector3(.42,2.34,0),new THREE.Vector3(.78,2.34,0),new THREE.Vector3(.87,2.27,0),
      new THREE.Vector3(.87,1.91,0),new THREE.Vector3(.8,1.84,0),new THREE.Vector3(.5,1.84,0),
    ],false,'catmullrom',.15)
    group.add(new THREE.Mesh(new THREE.TubeGeometry(handlePath,24,.03,6,false),black))
  } else {
    const blue=index===1
    const material=blue?createSurfaceMaterial({color:'#1239b1',metalness:.1,roughness:.18,clearcoat:.7,clearcoatRoughness:.09,envMapIntensity:.63},
      {height:[-.83,.83],top:'#eeeaff',bottom:'#a1b4e7',absorption:.1,edge:'#a5c6ff',edgeGain:.025,grain:140,microRoughness:.018}):black
    const body=new THREE.Mesh(new RoundedBoxGeometry(1.22,1.66,.61,3,.047),material)
    body.position.y=.96; group.add(body)
    const label=new THREE.Mesh(new THREE.PlaneGeometry(1.12,1.57),new THREE.MeshBasicMaterial({map:faceTexture(blue?'iconic':'intense'),transparent:true,depthWrite:false,toneMapped:false}))
    label.position.set(0,.96,.311); group.add(label)
    const neck=new THREE.Mesh(new THREE.CylinderGeometry(.29,.29,.13,32),black)
    neck.position.y=1.84; group.add(neck)
    studdedCap(group,!blue,chrome,black)
    chainAndMedallion(group,!blue,blue?chrome:createSurfaceMaterial({color:'#69747d',metalness:.95,roughness:.19,envMapIntensity:1},{grain:120,microRoughness:.04,edgeGain:.02}),black,.354)
    // Narrow polished bottom bevel: a real edge to catch the studio softboxes.
    const bevel=new THREE.Mesh(new RoundedBoxGeometry(1.215,.032,.605,2,.012),material)
    bevel.position.y=.147; group.add(bevel)
  }
  group.traverse(object=>{
    if(!object.isMesh)return
    object.userData.bottleIndex=index
    object.castShadow=false
    object.receiveShadow=false
  })
  return group
}


export default function FragranceGallery() {
  const hostRef = useRef(null)
  const loopRef = useRef(null)
  const pendingHoverRef = useRef(null)
  const selectedRef = useRef(0)
  const spinningRef = useRef(false)
  const angles = useRef([-.12, -.12, -.12, -.12])
  const [selected, setSelected] = useState(0)
  const [spinning, setSpinning] = useState(false)
  const [failed, setFailed] = useState(false)
  const [dragging, setDragging] = useState(false)

  const select = (index) => {
    pendingHoverRef.current = null
    if (selectedRef.current === index) return false
    selectedRef.current = index
    const wasSpinning = spinningRef.current
    spinningRef.current = false
    setSelected(index)
    setSpinning(false)
    if(wasSpinning)loopRef.current?.setAnimating(false)
    loopRef.current?.invalidate()
    return true
  }
  const toggleSpin = (index = selectedRef.current) => {
    select(index)
    spinningRef.current = !spinningRef.current
    setSpinning(spinningRef.current)
    loopRef.current?.setAnimating(spinningRef.current)
    loopRef.current?.invalidate()
  }
  const turn = (amount) => {
    spinningRef.current = false
    setSpinning(false)
    angles.current[selectedRef.current] += amount
    loopRef.current?.setAnimating(false)
    loopRef.current?.invalidate()
  }

  useEffect(() => {
    const onMotionPreference = (event) => {
      if (event.detail?.enabled === false) {
        spinningRef.current = false
        setSpinning(false)
        loopRef.current?.setAnimating(false)
      }
    }
    window.addEventListener('portfolio:motion', onMotionPreference)
    return () => window.removeEventListener('portfolio:motion', onMotionPreference)
  }, [])

  useEffect(() => {
    const host = hostRef.current
    let renderer
    try { renderer = new THREE.WebGLRenderer({ alpha:true, antialias:true, powerPreference:'low-power' }) }
    catch { setFailed(true); return }
    const pixelRatio = () => Math.min(window.devicePixelRatio, window.matchMedia('(max-width:700px), (pointer:coarse)').matches ? 1 : 1.25)
    renderer.setPixelRatio(pixelRatio())
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = .94
    // Grounding is baked into four soft contact textures; there is no live shadow pass.
    renderer.shadowMap.enabled = false
    host.appendChild(renderer.domElement)
    const scene = new THREE.Scene()
    const room = new RoomEnvironment()
    // Procedural studio softboxes add long, narrow reflections to curved glass.
    const softboxGeometry = new THREE.PlaneGeometry(.8, 5)
    const softboxMaterial = new THREE.MeshBasicMaterial({ color:new THREE.Color(3.5,3.6,3.7), toneMapped:false })
    for (const x of [-3.3,3.8]) {
      const panel = new THREE.Mesh(softboxGeometry,softboxMaterial)
      panel.position.set(x,2,4); panel.lookAt(0,1,0); room.add(panel)
    }
    const pmrem = new THREE.PMREMGenerator(renderer)
    const environment = pmrem.fromScene(room, .04, .1, 100, {size:128})
    scene.environment = environment.texture
    scene.environmentIntensity = .64
    room.dispose()
    pmrem.dispose()
    const camera = new THREE.PerspectiveCamera(34, 1, .1, 100)
    const models = fragrances.map((_, index) => {
      const model = createBottle(index)
      model.position.x = (index - 1.5) * 1.85
      model.rotation.y = angles.current[index]
      scene.add(model)
      return model
    })
    const shelf = new THREE.Mesh(
      new RoundedBoxGeometry(8.1, .16, 2.05, 2, .035),
      new THREE.MeshStandardMaterial({ color: '#26333c', roughness: .36, metalness: .2 }),
    )
    shelf.position.y = .04
    scene.add(shelf)
    const contactTexture = canvasTexture((ctx,w,h)=>{
      const gradient = ctx.createRadialGradient(w/2,h/2,0,w/2,h/2,w/2)
      gradient.addColorStop(0,'rgba(0,0,0,.65)'); gradient.addColorStop(.4,'rgba(0,0,0,.38)'); gradient.addColorStop(1,'rgba(0,0,0,0)')
      ctx.fillStyle=gradient; ctx.fillRect(0,0,w,h)
    },128,128)
    const contactMaterial = new THREE.MeshBasicMaterial({map:contactTexture,transparent:true,depthWrite:false,opacity:.54})
    const contactGeometry = new THREE.PlaneGeometry(1.55,1.12)
    models.forEach(model=>{
      const contact = new THREE.Mesh(contactGeometry,contactMaterial)
      contact.rotation.x=-Math.PI/2; contact.position.set(model.position.x,.123,0); scene.add(contact)
    })
    scene.add(new THREE.HemisphereLight('#f3f2ed', '#1a2736', .92))
    const key = new THREE.DirectionalLight('#fff9ef', 2.8)
    key.position.set(-3.5,5.5,5)
    scene.add(key)
    const rim = new THREE.DirectionalLight('#a9cde9', 2.2)
    rim.position.set(4, 3, -2)
    scene.add(rim)

    const raycaster = new THREE.Raycaster()
    const pointer = new THREE.Vector2()
    // Four stable world-space volumes replace thousands of triangle ray tests.
    // They cover caps/handles and stay usable while the decorative mesh spins.
    const hitBoxes = models.map((model,index)=>{
      const halfWidth=index===2?.91:.76
      return new THREE.Box3(new THREE.Vector3(model.position.x-halfWidth,.11,-.91),new THREE.Vector3(model.position.x+halfWidth,index===0?2.55:2.42,.91))
    })
    const hitPoint = new THREE.Vector3()
    const intersections = new THREE.Vector3()
    const pick = ({clientX,clientY}) => {
      const rect = host.getBoundingClientRect()
      if(!rect.width || !rect.height)return null
      pointer.set(((clientX-rect.left)/rect.width)*2-1,-((clientY-rect.top)/rect.height)*2+1)
      raycaster.setFromCamera(pointer,camera)
      let selectedIndex=null, nearest=Infinity
      hitBoxes.forEach((box,index)=>{
        if(raycaster.ray.intersectBox(box,hitPoint)) {
          const distance=intersections.copy(hitPoint).sub(raycaster.ray.origin).lengthSq()
          if(distance<nearest){nearest=distance;selectedIndex=index}
        }
      })
      return selectedIndex
    }
    let disposed=false, contextLost=false, ready=false, drawDirty=true
    let pointerId=null, downIndex=null, startX=0, startY=0, lastX=0, didDrag=false
    let lastSelected=-1, lastAngles=[]
    const loop = createRenderScheduler((time,delta)=>{
      if(disposed || contextLost || !ready)return
      const hover=pendingHoverRef.current
      pendingHoverRef.current=null
      if(hover && pointerId===null) {
        const index=pick(hover)
        host.style.cursor=index===null?'default':'pointer'
        if(index!==null && select(index))drawDirty=true
      }
      const active=selectedRef.current
      if(spinningRef.current && pointerId===null)angles.current[active]+=delta*.65
      if(lastSelected!==active || angles.current.some((angle,index)=>angle!==lastAngles[index]))drawDirty=true
      if(!drawDirty)return
      models.forEach((model,index)=>{
        model.rotation.y=angles.current[index]
        model.scale.setScalar(index===active?1.025:1)
      })
      lastSelected=active;lastAngles=[...angles.current]
      renderer.render(scene,camera)
      drawDirty=false
    },{maxFps:30})
    loopRef.current=loop
    const fail = () => {
      if(disposed || contextLost)return
      contextLost=true; loop.dispose()
      spinningRef.current=false;setSpinning(false);setFailed(true)
    }
    renderer.debug.onShaderError=(gl,program,vertexShader,fragmentShader)=>{
      console.error('Fragrance material shader failed to compile or link.',{
        program:gl.getProgramInfoLog(program),vertex:gl.getShaderInfoLog(vertexShader),fragment:gl.getShaderInfoLog(fragmentShader),
      })
      fail()
    }
    const pointerDown = (event) => {
      if(!event.isPrimary || (event.pointerType==='mouse' && event.button!==0))return
      pendingHoverRef.current=null
      const index=pick(event)
      if(index===null)return
      select(index)
      pointerId=event.pointerId;downIndex=index
      startX=event.clientX;startY=event.clientY;lastX=event.clientX;didDrag=false
      loop.setAnimating(false)
      host.setPointerCapture(pointerId)
    }
    const pointerMove = (event) => {
      if(pointerId!==null) {
        if(event.pointerId!==pointerId)return
        if(!didDrag && Math.hypot(event.clientX-startX,event.clientY-startY)>6) {
          didDrag=true;spinningRef.current=false;setSpinning(false);setDragging(true)
        }
        if(didDrag) {
          angles.current[selectedRef.current]+=(event.clientX-lastX)*.012
          loop.invalidate()
        }
        lastX=event.clientX
        return
      }
      if(event.pointerType==='touch')return
      pendingHoverRef.current={clientX:event.clientX,clientY:event.clientY}
      loop.invalidate()
    }
    const pointerUp = (event) => {
      if(event.pointerId!==pointerId)return
      const clicked=!didDrag && pick(event)===downIndex
      const index=downIndex
      pointerId=null;downIndex=null;setDragging(false)
      if(host.hasPointerCapture(event.pointerId))host.releasePointerCapture(event.pointerId)
      if(clicked)toggleSpin(index)
      else loop.setAnimating(spinningRef.current)
    }
    const cancelPointer = () => {
      pointerId=null;downIndex=null;setDragging(false)
      loop.setAnimating(spinningRef.current)
    }
    const leavePointer = () => {
      pendingHoverRef.current=null
      if(pointerId===null)host.style.cursor='default'
    }
    host.addEventListener('pointerdown',pointerDown)
    host.addEventListener('pointermove',pointerMove)
    host.addEventListener('pointerup',pointerUp)
    host.addEventListener('pointercancel',cancelPointer)
    host.addEventListener('lostpointercapture',cancelPointer)
    host.addEventListener('pointerleave',leavePointer)
    const resize = new ResizeObserver(()=>{
      if(disposed || contextLost)return
      const {width,height}=host.getBoundingClientRect()
      if(!width || !height)return
      renderer.setPixelRatio(pixelRatio())
      renderer.setSize(width,height)
      camera.aspect=width/height
      const distance=Math.max(5.95,8.8/(2*Math.tan(THREE.MathUtils.degToRad(17))*camera.aspect))
      camera.position.set(0,1.08+distance*.13,distance)
      camera.lookAt(0,1.08,0)
      camera.updateProjectionMatrix()
      camera.updateMatrixWorld(true)
      drawDirty=true;loop.invalidate()
    })
    resize.observe(host)
    const observer = new IntersectionObserver(([entry])=>loop.setVisible(entry.isIntersecting))
    observer.observe(host)
    const onContextLost = (event) => {event.preventDefault();fail()}
    renderer.domElement.addEventListener('webglcontextlost',onContextLost)
    // KHR_parallel_shader_compile is used when available; never draw a partially
    // initialized scene or revive a renderer that unmounted while compiling.
    scene.updateMatrixWorld(true)
    camera.position.set(0,2,7);camera.lookAt(0,1.08,0);camera.updateMatrixWorld(true)
    Promise.resolve().then(()=>{
      if(disposed || contextLost)return
      return renderer.compileAsync(scene,camera)
    }).then(()=>{
      if(disposed || contextLost)return
      ready=true;drawDirty=true;loop.invalidate()
    }).catch(error=>{console.error('Fragrance materials could not initialize.',error);fail()})
    return () => {
      disposed=true;loop.dispose()
      if(loopRef.current===loop)loopRef.current=null
      pendingHoverRef.current=null
      resize.disconnect();observer.disconnect()
      host.removeEventListener('pointerdown',pointerDown);host.removeEventListener('pointermove',pointerMove)
      host.removeEventListener('pointerup',pointerUp);host.removeEventListener('pointercancel',cancelPointer)
      host.removeEventListener('lostpointercapture',cancelPointer);host.removeEventListener('pointerleave',leavePointer)
      renderer.domElement.removeEventListener('webglcontextlost',onContextLost)
      const geometries=new Set(),materials=new Set(),textures=new Set()
      scene.traverse(object=>{
        if(object.geometry)geometries.add(object.geometry)
        if(object.material)for(const material of Array.isArray(object.material)?object.material:[object.material]) {
          materials.add(material)
          for(const key of ['map','bumpMap'])if(material[key])textures.add(material[key])
        }
        if(object.isInstancedMesh)object.dispose()
      })
      geometries.forEach(geometry=>geometry.dispose());textures.forEach(texture=>texture.dispose());materials.forEach(material=>material.dispose())
      environment.dispose();renderer.dispose();renderer.domElement.remove()
    }
  }, [])

  const current = fragrances[selected]
  return <div className="fragrance-gallery" data-selected={current.name} data-spinning={spinning}>
    <div className="fragrance-gallery-top"><span>THE SCENT SHELF</span><span>04 PERSONAL FAVORITES</span></div>
    <div className={`fragrance-stage${dragging ? ' is-dragging' : ''}${failed ? ' has-fallback' : ''}`} ref={hostRef} role={failed ? "group" : "img"} aria-label={`Four bottle studies. ${current.name} selected. Hover to select, click to start or stop spinning, drag to turn.`}>
      {failed && <div className="fragrance-fallback">{fragrances.map((item, index) => <button type="button" key={item.name} aria-label={`${spinning && selected === index ? 'Pause' : 'Spin'} ${item.name}`} onPointerEnter={(event) => { if(event.pointerType !== "touch") select(index) }} onFocus={() => select(index)} onClick={() => toggleSpin(index)} className={`fragrance-flat-bottle ${item.tone}${index === selected ? ' is-active' : ''}${spinning && selected === index ? ' is-spinning' : ''}`}><span>{item.name}</span></button>)}</div>}
    </div>
    <div className="fragrance-info"><div aria-live="polite" aria-atomic="true"><p className="fragrance-kicker">PERSONAL FAVORITE / {current.number}</p><h3>{current.name}</h3><p className="fragrance-detail">{current.detail}</p></div><div className="fragrance-rotation"><span className="fragrance-spin-status" aria-live="polite">{spinning ? 'SPINNING' : 'AT REST'}</span><div><button type="button" aria-label="Rotate selected fragrance left" onClick={() => turn(-.45)}><LuRotateCcw size={18} aria-hidden="true"/></button><button type="button" className="fragrance-spin-toggle" aria-label={`${spinning ? 'Pause' : 'Spin'} ${current.name}`} aria-pressed={spinning} onClick={() => toggleSpin()}>{spinning ? <LuPause size={16} aria-hidden="true"/> : <LuPlay size={16} aria-hidden="true"/>}</button><button type="button" aria-label="Rotate selected fragrance right" onClick={() => turn(.45)}><LuRotateCw size={18} aria-hidden="true"/></button></div></div></div>
    <div className="fragrance-switcher" role="group" aria-label="Choose a fragrance">{fragrances.map((item, index) => <button type="button" key={item.name} className={selected === index ? 'is-active' : ''} aria-pressed={selected === index} onPointerEnter={(event) => { if(event.pointerType !== "touch") select(index) }} onFocus={() => select(index)} onClick={() => toggleSpin(index)}><span className="fragrance-swatch" style={{ backgroundColor: item.color }}/><span>{item.name}</span><small>{item.number}</small></button>)}</div>
    <div className="fragrance-gallery-note"><span>Modeled from my collection</span><span>Hover to select · Click to spin / pause · Drag to turn</span></div>
  </div>
}















