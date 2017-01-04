import { WaterBurst } from './effects.js';
import { bindToClicks, bindToKeys } from './controls.js';
import { getAudioClock } from './audio.js';
import { blueBlast, orangeBlast, greenBlast } from './effects.js';

/*
 ========
 Controls
 --------
 Keys:
  [z] - draw orange burst
  [x] - draw blue burst
  [c] - draw green burst
*/
bindToKeys();

bindToClicks();


/*
 ========
 Start up
 --------
 Start the music and run timed effects
 */
window.clock = getAudioClock('http://localhost:3000/sound/first_breath.mp3');

const actionShortcuts = {
  'water': () => WaterBurst.play(),
  'boom_green': () => greenBlast(),
  'boom_blue': () => blueBlast(),
  'boom_orange': () => orangeBlast()
};

function atTime(time, action) {
  action = actionShortcuts[action] || action;

  window.clock.callbackAtTime(action, time);
}

function times(timedData) {
  for (let [time, action] of timedData) {
    atTime(time, action);
  }
}

times([
  [   1.00, 'boom_green'  ],
  [   4.88, 'boom_blue'   ],
  [   8.83, 'boom_orange' ],
  [  12.63, 'boom_blue'   ],
  [  16.63, 'boom_green'  ],
  [  20.38, 'boom_blue'   ],
  [  24.55, 'boom_orange' ],
  [  28.48, 'boom_green'  ],
  [  29.48, 'boom_green'  ],
  [  30.40, 'boom_green'  ],
  [  31.38, 'boom_green'  ],
  [  32.39, 'boom_green'  ],
  [  33.35, 'boom_green'  ],
  [  34.35, 'boom_green'  ],
  [  35.33, 'boom_green'  ],
  [  36.28, 'boom_green'  ],
]);
