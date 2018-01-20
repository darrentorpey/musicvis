import { BubbleField, Effects, Starburst } from './effects'

const actions = {
  m: () => window._show.toggleMute(),
  t: () => console.log('Time was', window._show.getCurrentTime()),
}

export function bindToKeys() {
  window.addEventListener('keydown', function(e) {
    let action
    switch (e.key) {
      case 'z':
        Effects.orangeBlast()
        break
      case 'x':
        Effects.blueBlast()
        break
      case 'c':
        Effects.greenBlast()
        break
      case 'w':
        Effects.waterBurst()
        break
      case 'v':
        Effects.lightBlueBlast()
        break
      case 'g':
        BubbleField.play({ y: window.innerHeight * 0.8 })
        break
      default:
        action = actions[e.key]
        return action ? action() : null
    }
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
