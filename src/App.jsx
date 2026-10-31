import { Component, lazy, Suspense, useEffect, useRef, useState } from 'react'
import { certifications, photos, profile, projects, technologies } from './profile'
import usePortfolioMotion from './usePortfolioMotion'
import GameCarousel from './GameCarousel'
import ThemeToggle from './ThemeToggle'
import TechnologyIcon from './TechnologyIcon'
import LazyImage from './LazyImage'
import { LuArrowDownRight, LuArrowUpRight, LuArrowRight, LuArrowLeft, LuArrowDown, LuArrowUp, LuArrowDownUp, LuAsterisk, LuChevronRight, LuCheck, LuCornerDownRight, LuX, LuMenu, LuChartNoAxesColumnIncreasing, LuMousePointer2, LuMail } from 'react-icons/lu'
import { FaGithub, FaLinkedinIn, FaInstagram } from 'react-icons/fa6'
import './App.css'
import './theme.css'

const Sculpture = lazy(() => import('./Sculpture'))
const FragranceGallery = lazy(() => import('./FragranceGallery'))
const Arrow = ({ diagonal = false }) => <span className="ui-icon" aria-hidden="true">{diagonal ? <LuArrowUpRight size="1em"/> : <LuArrowDownRight size="1em"/>}</span>

class SceneBoundary extends Component {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  render() { return this.state.failed ? this.props.fallback : this.props.children }
}

function DeferredScene({ children, fallback, className = '', id }) {
  const ref = useRef(null)
  const [ready, setReady] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setReady(true); observer.disconnect() }
    }, { rootMargin: '250px' })
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])
  return <div id={id} ref={ref} className={className}><SceneBoundary fallback={fallback}>{ready ? <Suspense fallback={fallback}>{children}</Suspense> : fallback}</SceneBoundary></div>
}

function PhotoCarousel() {
  const [current, setCurrent] = useState(0)
  const [broken, setBroken] = useState({})
  const photo = photos[current]
  const next = (step) => setCurrent((i) => (i + step + photos.length) % photos.length)
  return (
    <div className="photo-carousel" role="region" aria-roledescription="carousel" aria-label="Photos of James">
      <div className={`photo-frame photo-${photo.tone}`} onKeyDown={(e) => { if (e.key === 'ArrowRight') { e.preventDefault(); next(1) } if (e.key === 'ArrowLeft') { e.preventDefault(); next(-1) } }} tabIndex={0} aria-label="Photo carousel. Use left and right arrow keys to change photos.">
        {photo.src && !broken[current] ? <LazyImage key={photo.src} src={photo.src} srcSet={photo.srcSet} sizes="(max-width: 580px) 90vw, (max-width: 1100px) 42vw, (max-width: 1440px) 40vw, 568px" width={photo.width} height={photo.height} alt={photo.alt} style={{ objectPosition: photo.position || '50% 50%' }} onError={() => setBroken((prev) => ({ ...prev, [current]: true }))} /> : <div className="photo-placeholder"><div className="photo-sun" /><div className="photo-hill hill-back" /><div className="photo-hill hill-front" /><span className="photo-center">JRT<span>YOUR PHOTO GOES HERE</span></span><span className="photo-corner">A MOMENT, WAITING TO BE CAPTURED.</span></div>}
        <span className="photo-number">0{current + 1} / 0{photos.length}</span>
        {(!photo.src || broken[current]) && <span className="photo-stamp">MORE THAN<br/>A JOB TITLE.</span>}
      </div>
      <div className="photo-controls"><div aria-live="polite" aria-atomic="true"><span className="eyebrow">{photo.label}</span><p>{photo.title}</p></div><div className="carousel-arrows"><button aria-label="Previous photo" onClick={() => next(-1)}><LuArrowLeft size={16} aria-hidden="true"/></button><button aria-label="Next photo" onClick={() => next(1)}><LuArrowRight size={16} aria-hidden="true"/></button></div></div>
      <div className="photo-dots">{photos.map((p, i) => <button key={p.title} aria-label={`Show photo ${i + 1}`} aria-pressed={current === i} onClick={() => setCurrent(i)} />)}</div>
    </div>
  )
}

function Certifications() {
  return <div className="certifications" aria-labelledby="certifications-heading">
    <div className="certification-intro"><p className="eyebrow">ALWAYS LEARNING</p><h3 id="certifications-heading">A little proof<br/>{' '}<em>of the progress.</em></h3></div>
    {certifications.map((certification) => <article className="certification-card" key={`${certification.issuer}-${certification.title}`}>
      <div className="certification-mark" aria-hidden="true"><svg width="42" height="46" viewBox="0 0 42 46" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round"><path d="M21 2 38 9v13c0 10-17 21-17 21S4 32 4 22V9Z"/><path d="m12 16 9-4 9 4-9 4Zm0 6 9 4 9-4m-18 6 9 4 9-4"/></svg></div>
      <div className="certification-copy"><p className="eyebrow">{certification.issuer}</p><h4>{certification.title}</h4><span>Professional certification</span></div>
      <span className="certification-status"><span aria-hidden="true"><LuCheck size={11}/></span> CERTIFIED</span>
    </article>)}
  </div>
}

function ProjectArtwork({ theme }) {
  if (theme === 'internconnect') return <div className="connect-art" aria-hidden="true"><span className="art-window-label"><i/> INTERNCONNECT</span><div className="connect-node node-one">STUDENT<Arrow diagonal/></div><div className="connect-line"/><div className="connect-node node-two"><Arrow diagonal/> OPPORTUNITY</div><div className="connect-note">A new chapter<br/><em>starts here.</em></div></div>
  if (theme === 'portfolio') return <div className="portfolio-art" aria-hidden="true"><span className="art-window-label">JRT / A PERSONAL SPACE</span><div className="graphic-orbit"><i/><i/><i/><b/></div><span className="art-bottom-note">A LITTLE EXTRA DIMENSION.</span></div>
  return <div className="survey-art" aria-hidden="true"><span className="art-window-label">THE ART OF ASKING</span><div className="survey-sheet"><span className="sheet-number">01 — YOUR PERSPECTIVE</span><b>What’s on<br/>your mind?</b><div><i/>Something good.</div><div><i/>Something new.</div><span className="sheet-button">NEXT QUESTION <Arrow diagonal/></span></div></div>
}

function ProjectVisual({ project }) {
  const [broken, setBroken] = useState(false)
  return project.image && !broken
    ? <LazyImage className="project-screenshot" src={project.image} alt={`${project.title} screenshot`} onError={() => setBroken(true)} />
    : <ProjectArtwork theme={project.theme}/>
}

function Projects() {
  const [selected, setSelected] = useState(null)
  const dialog = useRef(null)
  useEffect(() => {
    if (selected) dialog.current.showModal()
  }, [selected])
  useEffect(() => {
    if (!selected) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = previous }
  }, [selected])
  const close = () => { dialog.current.close(); setSelected(null) }
  return <>
    <div className="project-grid">{projects.map((project) => <article className={`project-card project-${project.theme}`} key={project.id}>
      <button className="project-cover" onClick={() => setSelected(project)} aria-label={`View ${project.title}`}><ProjectVisual project={project}/><span className="open-project"><Arrow diagonal /></span></button>
      <div className="project-info"><p className="eyebrow">{project.id} / {project.category}</p><h3><button className="project-title" onClick={() => setSelected(project)}>{project.title}<Arrow diagonal /></button></h3><p>{project.description}</p><div className="project-tags">{project.stack.map((item) => <span key={item}>{item}</span>)}</div></div>
    </article>)}</div>
    <dialog data-lenis-prevent="" ref={dialog} className="project-dialog" aria-labelledby="project-dialog-title" onCancel={() => setSelected(null)} onClose={() => setSelected(null)} onClick={(e) => { const r = e.currentTarget.getBoundingClientRect(); if (e.target === e.currentTarget && (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom)) close() }}>
      {selected && <><button className="dialog-close" onClick={close} aria-label="Close project details"><LuX size={21} aria-hidden="true"/></button><p className="eyebrow">PROJECT {selected.id} / {selected.category}</p><div className={`dialog-art project-${selected.theme}`}><ProjectVisual key={selected.id} project={selected}/></div><h2 id="project-dialog-title">{selected.title}</h2><p className="project-status">{selected.status}</p><p className="dialog-copy">{selected.details}</p><div className="project-tags">{selected.stack.map((item) => <span key={item}>{item}</span>)}</div>{selected.url && <a className="button button-dark" href={selected.url} onClick={close} target={selected.url.startsWith("#") ? undefined : "_blank"} rel={selected.url.startsWith("#") ? undefined : "noopener noreferrer"}>{selected.url.startsWith("#") ? "Explore the portfolio" : "View live project"} <Arrow diagonal /></a>}</>}
    </dialog>
  </>
}

function ContactIcon({ type }) {
  const Icon = { Email: LuMail, LinkedIn: FaLinkedinIn, GitHub: FaGithub, Instagram: FaInstagram }[type]
  return <Icon size={23} aria-hidden="true"/>
}

export default function App() {
  const { activeSection, isScrolled, motionEnabled, toggleMotion, smoothScrollEnabled, toggleSmoothScroll } = usePortfolioMotion()
  const [menuOpen, setMenuOpen] = useState(false)
  const [techFilter, setTechFilter] = useState('All tools')
  const links = [['Home', '#home'], ['About me', '#about'], ['Projects', '#projects'], ['Contact', '#contact']]
  const contacts = [
    { name: 'Email', detail: profile.email, url: `mailto:${profile.email}` },
    { name: 'LinkedIn', detail: 'The professional side', url: profile.linkedin },
    { name: 'GitHub', detail: 'A look under the hood', url: profile.github },
    { name: 'Instagram', detail: '@jemsroooii', url: profile.instagram },
  ]
  return <>
    <a href="#main" className="skip-link">Skip to content</a>
    <header className={`site-header${isScrolled ? " is-scrolled" : ""}`}><a className="wordmark" href="#home" aria-label="James Roi Tanglao home">jrt<span>.</span></a><nav className={menuOpen ? 'main-nav is-open' : 'main-nav'} aria-label="Main navigation">{links.map(([label, url]) => <a href={url} key={url} className={activeSection === url.slice(1) ? "is-active" : undefined} aria-current={activeSection === url.slice(1) ? "location" : undefined} onClick={() => setMenuOpen(false)}>{label}</a>)}</nav><button type="button" className="scroll-toggle" onClick={toggleSmoothScroll} aria-label="Smooth scrolling" aria-pressed={smoothScrollEnabled}><span className="ui-icon" aria-hidden="true"><LuArrowDownUp size={16}/></span>Scroll: {smoothScrollEnabled ? "smooth" : "native"}</button><ThemeToggle/><a className="header-hello" href={`mailto:${profile.email}`}>Say hello <Arrow diagonal /></a><button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-controls="mobile-nav">{menuOpen ? 'Close' : 'Menu'}{menuOpen ? <LuX size={14} aria-hidden="true"/> : <LuMenu size={14} aria-hidden="true"/>}</button><nav id="mobile-nav" className={`mobile-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Mobile navigation" onKeyDown={(e) => { if (e.key === 'Escape') setMenuOpen(false) }}>{links.map(([label, url]) => <a href={url} key={url} className={activeSection === url.slice(1) ? "is-active" : undefined} aria-current={activeSection === url.slice(1) ? "location" : undefined} onClick={() => setMenuOpen(false)}>{label}<Arrow diagonal /></a>)}</nav></header>
    <main id="main">
      <section className="hero section-shell" id="home" aria-labelledby="home-heading">
        <div className="hero-copy"><p className="eyebrow introduction"><span className="tiny-star ui-icon" aria-hidden="true"><LuAsterisk size="1em"/></span> HELLO, I’M {profile.name.toUpperCase()}</p><h1 id="home-heading">Data minded.<br/><em>Curiosity driven.</em></h1><p className="hero-role">{profile.role} <span>at</span> <strong>{profile.company}<span className="accenture-mark ui-icon" aria-hidden="true"><LuChevronRight size="1em"/></span></strong></p><p className="hero-description">I work with data, build for the web, and follow my curiosity.<br className="wide-break"/> Welcome to my little corner of the internet.</p><div className="hero-actions"><a className="button button-dark" href="#projects">Take a look around <Arrow /></a><a className="quiet-link" href="#about">The person behind the code <span className="ui-icon" aria-hidden="true"><LuArrowRight size={14}/></span></a></div><div className="hero-note"><span className="status-dot"/> DATA, DEVELOPMENT & A FEW SIDE QUESTS.</div></div>
        <div className="hero-visual"><span className="visual-index">FIG. 01 / ALWAYS CONNECTING THE DOTS</span><DeferredScene className="hero-scene" fallback={<div className="scene-placeholder" aria-label="Abstract data sculpture"><div className="fallback-orbit"/><span>CONNECTING THE DOTS</span></div>}><Sculpture/></DeferredScene><div className="floating-label label-data"><span className="mini-bars ui-icon" aria-hidden="true"><LuChartNoAxesColumnIncreasing size={18}/></span> Data into possibility.</div><div className="floating-label label-curiosity"><Arrow diagonal/> A work in progress. Like me.</div><div className="visual-caption"><span><i/> LIVE IN 3D</span><span>MOVE YOUR POINTER <LuMousePointer2 size={11} aria-hidden="true"/></span></div></div>
        <a className="scroll-cue" href="#toolkit"><span>KEEP EXPLORING</span><LuArrowDown size={16} aria-hidden="true"/></a>
      </section>
      <section className="toolkit section-shell" id="toolkit" aria-labelledby="toolkit-heading"><div className="toolkit-intro"><p className="eyebrow">THE TOOLKIT</p><h2 id="toolkit-heading">A few things I <em>work with.</em></h2><p>From cloud platforms to the code that connects them.</p></div><div className="tech-filter" role="group" aria-label="Filter technologies">{['All tools', 'Data & cloud', 'Frameworks', 'Languages'].map((filter) => <button key={filter} onClick={() => setTechFilter(filter)} aria-pressed={techFilter === filter}>{filter}</button>)}</div><ul className="tech-grid">{technologies.filter((tech) => techFilter === 'All tools' || tech.group === techFilter).map((tech) => <li key={tech.name}><span className={`tech-mark mark-${tech.name.toLowerCase().replace(/[^a-z]/g, '')}`} aria-hidden="true"><TechnologyIcon name={tech.name}/></span>{tech.name}</li>)}</ul><Certifications/></section>
      <section className="about-section section-shell" id="about" aria-labelledby="about-heading"><div className="section-topline"><p className="eyebrow">01 / BEYOND THE JOB TITLE</p><span>A LITTLE MORE HUMAN.</span></div><div className="about-grid"><PhotoCarousel/><div className="about-copy"><span className="scribble-star ui-icon" aria-hidden="true"><LuAsterisk size="1em"/></span><h2 id="about-heading">Hi, I’m James.<br/>There’s more<br/><em>to the story.</em></h2><p>I’m {profile.name}, an {profile.role} at {profile.company}. Data is my day-to-day, but building things has a way of following me home.</p><p>When I’m away from code, you’ll probably find me in a match, deep in a story game, or deciding which fragrance fits the day.</p><div className="personal-signature">James Roi<span>— NICE TO MEET YOU.</span></div></div></div><GameCarousel/>
        <div className="fragrance-heading"><div><p className="eyebrow">ANOTHER KIND OF COLLECTION</p><h2>A nose for <em>good things.</em></h2></div><p>Yes, I’m a frag head.<br/>These are a few of my favorites.</p></div><DeferredScene id="fragrances" className="fragrance-container" fallback={<div className="fragrance-loading"><p className="eyebrow">THE FRAGRANCE SHELF</p><p>Hawas Ice · CDN Iconic · Odyssey Mega · CDNIM</p><span>Four favorites, a little extra dimension.</span></div>}><FragranceGallery/></DeferredScene>
      </section>
      <section className="projects-section section-shell" id="projects" aria-labelledby="projects-heading"><div className="section-topline"><p className="eyebrow">02 / THINGS I’VE BEEN BUILDING</p><span>IDEAS INTO SOMETHING REAL.</span></div><div className="projects-heading"><h2 id="projects-heading">A little work.<br/><em>A lot of learning.</em></h2><p>A few projects from my development journey.<br/>Open one and take a closer look.</p></div><Projects/><p className="projects-footnote"><span className="ui-icon" aria-hidden="true"><LuCornerDownRight size={13}/></span> Project artwork is illustrative. Screenshots and full case studies are on the way.</p></section>
      <section className="contact-section section-shell" id="contact" aria-labelledby="contact-heading"><div className="contact-top"><div><p className="eyebrow">03 / LET’S CONNECT</p><h2 id="contact-heading">The next good thing<br/>starts with <em>hello.</em></h2></div><a className="contact-orbit" href={`mailto:${profile.email}`} aria-label={`Email James at ${profile.email}`}><Arrow diagonal /></a></div><p className="contact-description">A project, a conversation, or a fragrance recommendation.<br/>I’m always happy to connect.</p><div className="contact-grid">{contacts.map((contact) => <a href={contact.url} key={contact.name} target={contact.name === 'Email' ? undefined : '_blank'} rel={contact.name === 'Email' ? undefined : 'noopener noreferrer'}><ContactIcon type={contact.name}/><div><h3>{contact.name}</h3><span>{contact.detail}</span></div><Arrow diagonal /></a>)}</div><div className="contact-bottom"><span>GOOD DATA. GOOD GAMES. GOOD SCENTS.</span><a href="#home">BACK TO TOP <span className="ui-icon" aria-hidden="true"><LuArrowUp size={12}/></span></a></div></section>
    </main><footer className="site-footer"><a className="wordmark" href="#home">jrt<span>.</span></a><p>© {new Date().getFullYear()} {profile.name}.</p><button type="button" className="motion-toggle" onClick={toggleMotion} aria-pressed={motionEnabled} aria-label="Decorative animations"><i aria-hidden="true"/>Animations: {motionEnabled ? "full" : "reduced"}</button><span>MADE WITH CARE & CURIOSITY.</span></footer>
  </>
}








