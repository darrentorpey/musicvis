import { WaterBurst } from './effects.js';
import * as Controls from './controls.js';
import { getAudioClock } from './audio.js';
import { Show } from './shows.js';
import { program } from './programs.js';

/*
 ========
 Controls
 --------
 Keys:
  [z] - draw orange burst
  [x] - draw blue burst
  [c] - draw green burst
  [w] - draw water burst
  [t] - output current sound-time
*/
Controls.bindToKeys();

window._program = program;

/*
 ========
 Start up
 --------
 Start the music and run timed effects
 */
getAudioClock({
  url: 'http://localhost:3000/sound/first_breath_after_coma__0__4_25.mp3'
}).then(({ song, clock }) => {
  window._show = Show.start({ song, clock, program: program.full() });
});
