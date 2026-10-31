import { useEffect, useState } from 'react'

// Keep this key in sync with the early theme script in index.html.
const themeKey = 'jrt-theme'

function readNightMode() {
  try { return window.localStorage.getItem(themeKey) === 'dark' }
  catch { return false }
}

export default function ThemeToggle() {
  const [night, setNight] = useState(readNightMode)
  useEffect(() => {
    const theme = night ? 'dark' : 'light'
    document.documentElement.dataset.theme = theme
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', night ? '#0b141a' : '#eeece2')
    try { window.localStorage.setItem(themeKey, theme) } catch { /* Theme still works when storage is blocked. */ }
  }, [night])

  return <button type="button" className="theme-toggle" aria-label="Night mode" aria-pressed={night} title={night ? 'Switch to day mode' : 'Switch to night mode'} onClick={() => setNight((enabled) => !enabled)}>
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {night ? <><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"/></> : <path d="M20.9 13.2A9 9 0 0 1 10.8 3.1a9 9 0 1 0 10.1 10.1Z"/>}
    </svg><span>Night</span>
  </button>
}
