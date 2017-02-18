import { WaterBurst } from './effects.js';
import { bindToClicks, bindToKeys } from './controls.js';
import { getAudioClock } from './audio.js';
import { blueBlast, lightBlueBlast, orangeBlast, greenBlast } from './effects.js';

const DEBUG = false;

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
bindToKeys();

// bindToClicks();

const actionShortcuts = {
  'water':          () => WaterBurst.play(),
  'boom_green':     () => greenBlast(),
  'boom_blue':      () => blueBlast(),
  'boom_lightblue': () => lightBlueBlast(),
  'boom_orange':    () => orangeBlast()
};

const mainProgram = [
  [   1.00, 'boom_lightblue'  ],
  [   4.88, 'boom_blue' ],
  [   8.83, 'boom_blue' ],
  [  12.63, 'boom_blue'   ],
  [  16.63, 'boom_lightblue'  ],
  [  20.38, 'boom_blue'   ],
  [  24.00, 'water|water|water|water|water' ],
  [  24.55, 'boom_blue' ],
  [  24.50, 'water|water|water|water|water' ],
  [  25.00, 'water|water|water|water|water' ],
  [  25.50, 'water|water|water|water|water' ],
  [  26.00, 'water|water|water|water|water' ],
  [  26.50, 'water|water|water|water|water' ],
  [  27.00, 'water|water|water|water|water' ],
  [  28.48, 'boom_lightblue'  ],
  [  29.48, 'boom_lightblue'  ],
  [  30.40, 'boom_blue'  ],
  [  31.38, 'boom_lightblue'  ],
  [  32.39, 'boom_lightblue'  ],
  [  33.35, 'boom_lightblue'  ],
  [  34.35, 'boom_blue'  ],
  [  35.33, 'boom_blue'  ],
  [  36.28, 'boom_lightblue'  ],
];

function logScheduleItem({ action, time }) {
  console.log(`[${time}] [${action}]`);
}

class Show {
  constructor({ song, clock, program }) {
    this.song = song;
    this.clock = clock;
    this._originalProgram = _.clone(program);
    this.program = program;
  }

  resetClock() {
    this.clock.stop();
    this.clock._events = []
    this.clock.start();
  }

  jumpTo(seconds) {
    this.song.replay(seconds);

    this.resetClock();

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

  start() {
    for (let [time, action] of this.program) {
      this.parseActions(action).forEach(action => (time > 0) && this.clock.setTimeout(action, time));
    }
  }

  stop() {
    this.clock.stop();
    this.song.stop();
  }

  reschedule(seconds) {
    DEBUG && console.log(`Current Time: ${this.song.startTime}`);

    this.program = this._originalProgram.map(([time, action]) => {
      let adjustedTime = time - seconds;
      return [adjustedTime, action];
    })

    DEBUG && this.program.forEach(([time, action]) => logScheduleItem({ action, time }));

    this.start();
  }
}

/*
 ========
 Start up
 --------
 Start the music and run timed effects
 */
getAudioClock({
  url: 'http://localhost:3000/sound/first_breath_after_coma__0__4_25.mp3'
}).then(
  startShow
);

function startShow({ song, clock }) {
  window._show = new Show({ song, clock, program: mainProgram });
  window._show.start();
}
