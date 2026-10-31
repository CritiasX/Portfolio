/** Coalesced, demand-driven rendering. No RAF is retained for an idle/hidden scene. */
export function createRenderScheduler(render, {
  maxFps = 30,
  requestFrame = (callback) => requestAnimationFrame(callback),
  cancelFrame = (id) => cancelAnimationFrame(id),
  visibility = document,
} = {}) {
  const interval = 1000 / maxFps
  let frame = null
  let dirty = false
  let animating = false
  let visible = true
  let disposed = false
  let lastRender = null

  const cancel = () => {
    if (frame !== null) cancelFrame(frame)
    frame = null
    lastRender = null
  }
  const shouldRun = () => !disposed && visible && !visibility.hidden && (dirty || animating)
  const schedule = () => {
    if (frame === null && shouldRun()) frame = requestFrame(tick)
  }
  function tick(time) {
    frame = null
    if (!shouldRun()) return
    const elapsed = lastRender === null ? Infinity : time - lastRender
    if (elapsed + .1 < interval) { schedule(); return }
    const delta = lastRender === null ? 0 : Math.min(elapsed / 1000, .05)
    lastRender = time
    dirty = false
    render(time, delta)
    schedule()
  }
  const onVisibility = () => {
    if (visibility.hidden) cancel()
    else { dirty = true; schedule() }
  }
  visibility.addEventListener('visibilitychange', onVisibility)
  return {
    invalidate() { if (!disposed) { dirty = true; schedule() } },
    setAnimating(value) {
      if (disposed) return
      const next = Boolean(value)
      if (next === animating) { schedule(); return }
      if (next) lastRender = null
      animating = next
      if (!animating && !dirty) cancel()
      else schedule()
    },
    setVisible(value) {
      if (disposed) return
      visible = Boolean(value)
      if (!visible) cancel()
      else { dirty = true; schedule() }
    },
    dispose() {
      disposed = true
      cancel()
      visibility.removeEventListener('visibilitychange', onVisibility)
    },
  }
}
