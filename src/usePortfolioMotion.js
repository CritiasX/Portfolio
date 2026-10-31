import { useEffect, useState } from 'react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import { animationPreferenceKey, scrollPreferenceKey, readPreference, savePreference, animationsEnabledByDefault } from './motionPreferences'

const sectionIds = ['home', 'about', 'projects', 'contact']

export default function usePortfolioMotion() {
  const [activeSection, setActiveSection] = useState('home')
  const [isScrolled, setIsScrolled] = useState(false)
  const [smoothScrollEnabled, setSmoothScrollEnabled] = useState(() => readPreference(scrollPreferenceKey) !== 'native')
  const [motionEnabled, setMotionEnabled] = useState(animationsEnabledByDefault)
  const toggleMotion = () => {
    const next = !motionEnabled
    savePreference(animationPreferenceKey, next ? 'full' : 'reduced')
    setMotionEnabled(next)
  }
  const toggleSmoothScroll = () => {
    const next = !smoothScrollEnabled
    savePreference(scrollPreferenceKey, next ? 'smooth' : 'native')
    setSmoothScrollEnabled(next)
  }

  useEffect(() => {
    document.documentElement.classList.toggle('motion-on', motionEnabled)
    document.documentElement.classList.toggle('motion-off', !motionEnabled)
    window.dispatchEvent(new CustomEvent('portfolio:motion', { detail: { enabled: motionEnabled } }))
    return () => document.documentElement.classList.remove('motion-on', 'motion-off')
  }, [motionEnabled])

  useEffect(() => {
    const main = document.getElementById('main')
    const revealElements = [...main.querySelectorAll('.toolkit-intro, .tech-grid, .certifications, .section-topline, .about-grid, .gaming-strip, .fragrance-heading, .fragrance-container, .projects-heading, .project-card, .contact-top, .contact-description, .contact-grid')]
    revealElements.forEach((element) => {
      element.classList.add('reveal')
      const rect = element.getBoundingClientRect()
      if (rect.top < window.innerHeight && rect.bottom > 0) element.classList.add('is-revealed')
    })
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => entry.target.classList.toggle('is-revealed', entry.isIntersecting))
    }, { threshold: .06, rootMargin: '0px 0px -24px 0px' })
    revealElements.forEach((element) => revealObserver.observe(element))
    main.classList.add('motion-ready')
    return () => {
      revealObserver.disconnect()
      main.classList.remove('motion-ready')
      revealElements.forEach((element) => element.classList.remove('reveal', 'is-revealed'))
    }
  }, [])

  useEffect(() => {
    const header = document.querySelector('.site-header')
    const sections = sectionIds.map((id) => document.getElementById(id))
    const lenis = new Lenis({
      autoRaf: true,
      smoothWheel: smoothScrollEnabled,
      syncTouch: false,
      lerp: smoothScrollEnabled ? 0.085 : 1,
      anchors: false,
      respectReducedMotion: false, // The requested effects have explicit site controls.
      // Keep scrolling inside the project dialog native.
      prevent: (node) => node.tagName === 'DIALOG',
    })
    let scrollFrame = null
    const updateLocation = () => {
      scrollFrame = null
      const threshold = header.getBoundingClientRect().height + Math.min(window.innerHeight * .25, 180)
      let current = 'home'
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= threshold) current = section.id
      }
      if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4) current = 'contact'
      setActiveSection(current)
      setIsScrolled(window.scrollY > 20)
    }
    const onScroll = () => {
      if (scrollFrame === null) scrollFrame = requestAnimationFrame(updateLocation)
    }
    const focusDestination = (target) => {
      const heading = target.querySelector('h1, h2') || target
      const hadTabIndex = heading.hasAttribute('tabindex')
      if (!hadTabIndex) heading.setAttribute('tabindex', '-1')
      heading.focus({ preventScroll: true })
      if (!hadTabIndex) heading.addEventListener('blur', () => heading.removeAttribute('tabindex'), { once: true })
    }
    const scrollToHash = (hash, { immediate = false, focus = false } = {}) => {
      const target = document.getElementById(hash.slice(1))
      if (!target) return false
      const offset = -(header.getBoundingClientRect().height + (hash === '#home' ? 0 : 24))
      // Closing a project dialog and following its link can happen in the same event.
      if (!document.querySelector('dialog[open]')) lenis.start()
      // Use a numeric destination: current Lenis also subtracts CSS scroll-padding
      // for element targets, which would otherwise count our sticky-header gap twice.
      const destination = hash === '#home' ? 0 : Math.max(0, target.getBoundingClientRect().top + window.scrollY + offset)
      lenis.scrollTo(destination, {
        duration: 1.25,
        easing: (t) => 1 - (1 - t) ** 4,
        immediate: immediate || !smoothScrollEnabled,
        onComplete: () => { if (focus) focusDestination(target) },
      })
      return true
    }
    const onAnchor = (event) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      const link = event.target.closest('a[href^="#"]')
      if (!link || link.hasAttribute('download') || link.target === '_blank') return
      const hash = link.getAttribute('href')
      if (!hash || hash.length < 2 || !document.getElementById(hash.slice(1))) return
      event.preventDefault()
      if (window.location.hash !== hash) window.history.pushState(null, '', hash)
      scrollToHash(hash, { focus: event.detail === 0 || link.classList.contains('skip-link') })
    }
    const onHistory = () => scrollToHash(window.location.hash || '#home', { immediate: true })
    const dialog = document.querySelector('.project-dialog')
    const dialogObserver = new MutationObserver(() => {
      if (dialog.open) lenis.stop()
      else lenis.start()
    })
    if (dialog) dialogObserver.observe(dialog, { attributes: true, attributeFilter: ['open'] })

    document.addEventListener('click', onAnchor)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    window.addEventListener('popstate', onHistory)
    window.addEventListener('hashchange', onHistory)
    updateLocation()
    return () => {
      lenis.destroy()
      if (scrollFrame !== null) cancelAnimationFrame(scrollFrame)
      dialogObserver.disconnect()
      document.removeEventListener('click', onAnchor)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      window.removeEventListener('popstate', onHistory)
      window.removeEventListener('hashchange', onHistory)
    }
  }, [smoothScrollEnabled])
  return { activeSection, isScrolled, motionEnabled, toggleMotion, smoothScrollEnabled, toggleSmoothScroll }
}
