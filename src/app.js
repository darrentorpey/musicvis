import * as Controls from 'controls';
import { getAudioClock } from 'audio';
import { Show } from 'shows';
import { program } from 'programs';

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

async function startUp() {
  const { song, clock } = await getAudioClock({
    url: 'http://localhost:3000/sound/first_breath_after_coma__0__4_25.mp3'
  });

  window._show = Show.start({ song, clock, program: program.full() });
}

/*
 ========
 Start up
 --------
 Start the music and run timed effects
 */
startUp();
