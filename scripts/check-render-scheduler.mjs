import assert from 'node:assert/strict'
import { createRenderScheduler } from '../src/renderScheduler.js'

function harness() {
  const callbacks = new Map()
  const visibility = new EventTarget()
  visibility.hidden = false
  let nextId = 0
  const renders = []
  const loop = createRenderScheduler((time, delta) => renders.push({ time, delta }), {
    maxFps: 30, visibility,
    requestFrame: (callback) => { callbacks.set(++nextId, callback); return nextId },
    cancelFrame: (id) => callbacks.delete(id),
  })
  const frame = (time) => { const pending = [...callbacks.values()]; callbacks.clear(); pending.forEach((callback) => callback(time)) }
  return { loop, callbacks, renders, frame, visibility }
}

const idle = harness()
assert.equal(idle.callbacks.size, 0, 'An idle scene must not poll RAF')
for (let i = 0; i < 100; i++) idle.loop.invalidate()
assert.equal(idle.callbacks.size, 1, 'Input events must coalesce into one pending frame')
idle.frame(0)
assert.equal(idle.renders.length, 1)
assert.equal(idle.callbacks.size, 0, 'Static rendering must immediately become idle')
idle.loop.invalidate(); idle.frame(10)
assert.equal(idle.renders.length, 1, 'Rapid inputs must still respect the frame budget')
idle.frame(34)
assert.equal(idle.renders.length, 2)
for (let time = 35; time <= 65; time++) {
  idle.loop.setAnimating(false)
  idle.loop.invalidate()
  idle.frame(time)
}
assert.equal(idle.renders.length, 2, 'Repeated idle controls must not reset the rate limit')
idle.frame(68)
assert.equal(idle.renders.length, 3)
idle.loop.dispose()
process.stdout.write('PASS idle scheduling, input coalescing, and frame budget\n')

const moving = harness()
moving.loop.setAnimating(true)
for (let i = 0; i <= 60; i++) moving.frame(i * 1000 / 60)
assert.ok(moving.renders.length >= 29 && moving.renders.length <= 31, '60 Hz animation must render at most 30 fps')
moving.loop.setAnimating(false)
assert.equal(moving.callbacks.size, 0, 'Stopping animation must cancel the idle loop')
moving.loop.setVisible(false); moving.loop.setAnimating(true); moving.loop.invalidate()
assert.equal(moving.callbacks.size, 0, 'Offscreen scenes must not schedule frames')
moving.loop.setVisible(true); moving.frame(5000)
assert.equal(moving.renders.at(-1).delta, 0, 'Resuming a scene must not jump by hidden elapsed time')
moving.visibility.hidden = true; moving.visibility.dispatchEvent(new Event('visibilitychange'))
assert.equal(moving.callbacks.size, 0, 'Hidden tabs must cancel pending frames')
moving.visibility.hidden = false; moving.visibility.dispatchEvent(new Event('visibilitychange'))
assert.equal(moving.callbacks.size, 1, 'Visible animation must resume once')
moving.loop.dispose()
moving.visibility.dispatchEvent(new Event('visibilitychange')); moving.loop.invalidate(); moving.loop.setAnimating(true)
assert.equal(moving.callbacks.size, 0, 'Disposed scenes must not restart')
process.stdout.write('PASS 30 fps cap, offscreen/hidden suspension, resume, and disposal\n')
