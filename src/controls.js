import { throttle } from 'lodash'

import { BubbleField, Starburst } from './effects'
import { logTime, report } from './logger'
import { addEffect } from './orchestrator'

const tweaks = {
  count: 4,
  strokeWidth: 40,
  // easing: 'sin.out',
  easing: 'back.out',
  scaleTo: 2,
}
/*
 * ========
 * Controls
 * --------
 * Keys:
 *  [c] - effect: draw green burst
 *  [g] - effect: bubble field
 *  [r] - report on all ad-hoc added effects
 *  [t] - output current sound-time
 *  [v] - effect: draw light blue burst
 *  [w] - effect: draw water burst
 *  [x] - effect: draw blue burst
 *  [z] - effect: draw orange burst
 */
const actions = {
  c: () => addEffect('boom_green'),
  d: () => new Starburst(tweaks).moveToCoords({ x: 150, y: 150 }),
  g: () => BubbleField.play({ y: window.innerHeight * 0.8 }),
  m: () => window._show.toggleMute(),
  r: () => report(),
  t: () => logTime('Time was '),
  v: () => addEffect('boom_lightblue'),
  w: () => addEffect('water'),
  x: () => addEffect('boom_blue'),
  z: () => addEffect('boom_orange'),
}

export function bindToKeys() {
  document.addEventListener(
    'keydown',
    throttle(e => {
      const action = actions[e.key]

      action ? action() : null
    }, 100)
  )
}

export function bindToClicks() {
  document.addEventListener('click', e => {
    const newStarburst = new Starburst()

    newStarburst.moveToCoords({ x: e.pageX, y: e.pageY })

    if (window.clock) {
      const time = window.clock.context.currentTime.toString().match(/[0-9]+.?[0-9]{0,2}/)
      console.log('Time was', time[0])
    }
  })
}
