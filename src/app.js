import * as Controls from 'controls';
import { startSong } from 'songs';
import { Show } from 'shows';
import { program } from 'programs';

// document.write(`<script src="//${location.hostname}:35729/livereload.js?snipver=1"></script>`);

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

async function startShow() {
  const song = await startSong('first_breath_after_coma__0__4_25.mp3');

  return Show.start({ song, program: program.full() });
}

/*
 * ========
 * Start up
 * --------
 * Start the music and run timed effects
 */
startShow().then(show => window._show = show);
