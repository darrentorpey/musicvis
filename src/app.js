import * as Controls from './controls'
import Song from './songs'
import Show from './shows'
import HUD from './hud'
import * as Programs from './programs'
import areYouAwakeMp3 from '../assets/are_you_awake.mp3'
// import firstBreathMp3 from '../assets/first_breath_after_coma__0__4_25.mp3'

const startAt = new Number(new URLSearchParams(window.location.search).get('startAt'))

/*
 * ========
 * Start up
 * --------
 * Start the music and run timed effects
 */
async function playShow(startAt) {
  const song = await Song.fromUrl(areYouAwakeMp3)
  const program = Programs.ARE_YOU_AWAKE.full()
  const show = Show.start({ song, program, startAt })

  HUD.attach(document.body, show)

  Controls.bindToKeys()
  Controls.bindToClicks()

  window._show = show

  if (module.hot) {
    module.hot.dispose(() => window._show.stop())
  }
}

playShow(startAt)
