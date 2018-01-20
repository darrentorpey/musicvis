import { BubbleField, Effects, Starburst } from './effects'

const actions = {
  m: () => window._show.toggleMute(),
  t: () => console.log('Time was', window._show.getCurrentTime()),
  g: () => BubbleField.play({ y: window.innerHeight * 0.8 }),
  x: () => Effects.blueBlast(),
  c: () => Effects.greenBlast(),
  w: () => Effects.waterBurst(),
  v: () => Effects.lightBlueBlast(),
  z: () => Effects.orangeBlast(),
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
