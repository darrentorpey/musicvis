import * as Controls from './controls'
import Song from './songs'
import Show from './shows'
import HUD from './hud'
import { EXPLOSIONS_FIRST } from './programs'
import areYouAwakeMp3 from '../assets/are_you_awake.mp3'

/*
 * ========
 * Controls
 * --------
 * Keys:
 *  [z] - draw orange burst
 *  [x] - draw blue burst
 *  [c] - draw green burst
 *  [w] - draw water burst
 *  [t] - output current sound-time
 */
Controls.bindToKeys()

/*
 * ========
 * Start up
 * --------
 * Start the music and run timed effects
 */
async function main() {
  const song = await Song.fromUrl(areYouAwakeMp3)
  const startAt = new Number(new URLSearchParams(window.location.search).get('startAt'))
  const program = EXPLOSIONS_FIRST.full()

  const show = Show.start({ song, program, startAt })

  window._show = show
  window._hud = HUD.start(show)
}

main()
