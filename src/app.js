import * as Controls from './controls'
import Song from './songs'
import Show from './shows'
import HUD from './hud'
import { EXPLOSIONS_FIRST } from './programs'

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
  const song = await Song.from({
    songName: 'first_breath_after_coma__0__4_25.mp3',
  })
  const startAt = new Number(new URLSearchParams(window.location.search).get('startAt'))
  const program = EXPLOSIONS_FIRST.full()

  const show = Show.start({ song, program, startAt })

  window._show = show
  window._hud = HUD.start(show)
}

main()
