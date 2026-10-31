import assert from 'node:assert/strict'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { createServer } from 'vite'

// Render the real controls and hero in a fresh browser preference context.
// Explicit site choices are retained; OS/legacy settings cannot suppress the
// requested autoplay, reveals, or smooth scrolling on a fresh Brave profile.
// Keep the SSR check from replacing the running preview's optimized modules.
const server = await createServer({ cacheDir: 'node_modules/.vite-scroll-check', server: { middlewareMode: true, hmr: false }, appType: 'custom' })
const scenarios = [
  { name: 'Fresh Brave profile with OS reduced motion', reduced: true, saved: {}, scroll: true, animations: true },
  { name: 'Legacy automatic reduced setting is migrated', reduced: true, saved: { 'jrt-motion': 'reduced' }, scroll: true, animations: true },
  { name: 'Explicit current animation opt-out is preserved', reduced: false, saved: { 'jrt-animations-v2': 'reduced' }, scroll: true, animations: false },
  { name: 'Explicit full animations override OS setting', reduced: true, saved: { 'jrt-animations-v2': 'full' }, scroll: true, animations: true },
  { name: 'Explicit native scrolling is preserved', reduced: false, saved: { 'jrt-animations-v2': 'full', 'jrt-smooth-scroll': 'native' }, scroll: false, animations: true },
  { name: 'Smooth scrolling with reduced animations', reduced: true, saved: { 'jrt-animations-v2': 'reduced', 'jrt-smooth-scroll': 'smooth' }, scroll: true, animations: false },
  { name: 'Storage unavailable under privacy restrictions', reduced: true, blocked: true, saved: {}, scroll: true, animations: true },
  { name: 'Normal fresh profile', reduced: false, saved: {}, scroll: true, animations: true },
]
try {
  const { default: App } = await server.ssrLoadModule('/src/App.jsx')
  const { default: Sculpture } = await server.ssrLoadModule('/src/Sculpture.jsx')
  for (const scenario of scenarios) {
    globalThis.window = {
      localStorage: { getItem(key) { if (scenario.blocked) throw new Error('Storage blocked'); return scenario.saved[key] ?? null } },
      matchMedia: () => ({ matches: scenario.reduced }),
    }
    const markup = renderToString(React.createElement(App))
    for (const [label, expected] of [['Smooth scrolling', scenario.scroll], ['Decorative animations', scenario.animations]]) {
      const tag = markup.match(new RegExp(`<button\\b[^>]*aria-label="${label}"[^>]*>`))?.[0]
      assert.ok(tag, `${scenario.name}: missing ${label} control`)
      assert.ok(tag.includes(`aria-pressed="${expected}"`), `${scenario.name}: ${label} should be ${expected}`)
    }
    const heroMarkup = renderToString(React.createElement(Sculpture))
    assert.ok(heroMarkup.includes(`aria-label="${scenario.animations ? 'Pause' : 'Play'} 3D animation"`), `${scenario.name}: hero autoplay must match the explicit site preference`)
    process.stdout.write(`PASS ${scenario.name}\n`)
  }
} finally {
  delete globalThis.window
  await server.close()
}
