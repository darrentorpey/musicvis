import { WaterBurst } from './effects.js';
import { bindToClicks, bindToKeys } from './controls.js';
import { getAudioClock } from './audio.js';
import { blueBlast, lightBlueBlast, orangeBlast, greenBlast } from './effects.js';

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

// bindToClicks();

const actionShortcuts = {
  'water':          () => WaterBurst.play(),
  'boom_green':     () => greenBlast(),
  'boom_blue':      () => blueBlast(),
  'boom_lightblue': () => lightBlueBlast(),
  'boom_orange':    () => orangeBlast()
};

const program = [
  [   1.00, 'boom_lightblue'  ],
  [   4.88, 'boom_blue' ],
  [   8.83, 'boom_blue' ],
  [  12.63, 'boom_blue'   ],
  [  16.63, 'boom_lightblue'  ],
  [  20.38, 'boom_blue'   ],
  [  24.55, 'boom_blue' ],
  [  28.48, 'boom_lightblue'  ],
  [  29.48, 'boom_lightblue'  ],
  [  30.40, 'boom_blue'  ],
  [  31.38, 'boom_lightblue'  ],
  [  32.39, 'boom_lightblue'  ],
  [  33.35, 'boom_lightblue'  ],
  [  34.35, 'boom_blue'  ],
  [  35.33, 'boom_blue'  ],
  [  36.28, 'boom_lightblue'  ],
  [  24.40, 'water|water|water|water|water' ],
  [  24.90, 'water|water|water|water|water' ],
  [  25.40, 'water|water|water|water|water' ],
  [  25.90, 'water|water|water|water|water' ],
  [  26.40, 'water|water|water|water|water' ],
  [  26.90, 'water|water|water|water|water' ],
  [  27.40, 'water|water|water|water|water' ],
];

function logScheduleItem({ action, adjustedTime }) {
  console.log(`[${adjustedTime}] [${action}]`);
}

class Show {
  constructor({ song, clock, program }) {
    this.song = song;
    this.clock = clock;
    this.program = program;
  }

  jumpTo(seconds) {
    this.song.replay(seconds);
    this.reschedule(seconds);
  }

  parseActions(action) {
    if (_.isFunction(action)) {
      return [action];
    } else {
      let actions = action.split('|');
      return actions.map(action => actionShortcuts[action]);
    }
  }

  scheduleProgram(programData, offset = 0) {
    for (let [time, action] of programData) {
      let actions = this.parseActions(action);
      let adjustedTime = time - offset;
      actions.forEach(action => (adjustedTime > 0) && this.clock.callbackAtTime(action, adjustedTime));
      // actions.forEach(action => (time > 0) && logScheduleItem({ action, adjustedTime }));
      actions.forEach(action => logScheduleItem({ action, adjustedTime }));
    }
  }

  start({ offset } = { offset: 0 }) {
    this.scheduleProgram(this.program, offset);
  }

  reschedule(seconds) {
    this.start({ offset: seconds || this.song.startTime });
  }
}

/*
 ========
 Start up
 --------
 Start the music and run timed effects
 */

getAudioClock({
  url: 'http://localhost:3000/sound/first_breath.mp3'
}).then(
  startShow
);

function startShow({ song, clock }) {
  window._show = new Show({ song, clock, program });
  window._show.start();
}
