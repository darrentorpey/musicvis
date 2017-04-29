import { Effect, WaterBurst, blueBlast, lightBlueBlast, orangeBlast, greenBlast } from 'effects';
import _ from 'lodash';

const DEBUG = false;

function logScheduleItem({ action, time }) {
  console.log(`[${time}] [${action}]`);
}

const actionShortcuts = {
  'water':          () => WaterBurst.play(),
  'boom_green':     () => greenBlast(),
  'boom_blue':      () => blueBlast(),
  'boom_lightblue': () => lightBlueBlast(),
  'boom_orange':    () => orangeBlast()
};

export class Show {
  constructor({ song, program }) {
    this.song = song;
    this.clock = song.clock;
    this._originalProgram = _.clone(program);
    this.program = program;
  }

  resetClock() {
    this.clock.stop();
    this.clock._events = []
    this.clock.start();
  }

  reschedule(seconds  ) {
    DEBUG && console.log(`Current Time: ${this.song.startTime}`);

    this.program = this._originalProgram.map(([time, action]) => {
      let adjustedTime = time - seconds;
      return [adjustedTime, action];
    })

    DEBUG && this.program.forEach(([time, action]) => logScheduleItem({ action, time }));

    this.start();
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
      this.parseActions(action).forEach(action =>
        (time > 0) && this.clock.setTimeout(action, time)
      );
    }
  }

  stop() {
    this.clock.stop();
    this.song.stop();
  }

  static start(...args) {
    const show = new Show(...args);

    show.start();

    return show;
  }
}
