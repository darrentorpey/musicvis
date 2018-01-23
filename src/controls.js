import { BubbleField, Starburst } from './effects'
import { logTime, report } from './logger'
import { addEffect } from './orchestrator'

const actions = {
  c: () => addEffect('boom_green'),
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
  window.addEventListener('keydown', function(e) {
    const action = actions[e.key]

    action ? action() : null
  })
}

export function bindToClicks() {
  document.addEventListener(
    'click',
    function(e) {
      const newStarburst = new Starburst()

      newStarburst.moveToCoords({ x: e.pageX, y: e.pageY })

      if (window.clock) {
        const time = window.clock.context.currentTime.toString().match(/[0-9]+.?[0-9]{0,2}/)
        console.log('Time was', time[0])
      }
    },
    false
  )
}
