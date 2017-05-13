import { BubbleField, Effects, Starburst } from './effects'

export function bindToKeys() {
  window.addEventListener('keydown', function(e) {
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
      case 't':
        console.log('Time was', window._show.getCurrentTime())
        break
      case 'g':
        BubbleField.play({ y: window.innerHeight * 0.8 })
        break
      default:
        return
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
