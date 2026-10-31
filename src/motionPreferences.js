// v2 adopts the requested autoplay/reveal defaults. The old jrt-motion value
// could have been inherited from OS settings and must not silently disable them.
export const animationPreferenceKey = 'jrt-animations-v2'
export const scrollPreferenceKey = 'jrt-smooth-scroll'

export function readPreference(key) {
  try { return window.localStorage.getItem(key) }
  catch { return null }
}

export function animationsEnabledByDefault() {
  return readPreference(animationPreferenceKey) !== 'reduced'
}

export function savePreference(key, value) {
  try { window.localStorage.setItem(key, value) } catch { /* Browser storage is optional. */ }
}
