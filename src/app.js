import * as Controls from 'controls';
import Song from 'songs';
import Show from 'shows';
import { program } from 'programs';

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
Controls.bindToKeys();

/*
 * ========
 * Start up
 * --------
 * Start the music and run timed effects
 */
(async () => {
  const song = await Song.from({ songName:
    'first_breath_after_coma__0__4_25.mp3'
  });

  window._show = Show.start({ song, program: program.full() });
})();
