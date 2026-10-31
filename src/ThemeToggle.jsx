import { useEffect, useState } from 'react'
import { LuMoon, LuSun } from 'react-icons/lu'

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
    {night ? <LuSun size={17} aria-hidden="true"/> : <LuMoon size={17} aria-hidden="true"/>}<span>Night</span>
  </button>
}
