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

export default class Show {
  constructor({ song, program }) {
    this.song = song;
    this.clock = song.clock;
    this._programBlueprint = _.clone(program);
  }

  resetClock() {
    this.clock.stop();
    this.clock._events = []
    this.clock.start();
  }

  reschedule(seconds) {
    DEBUG && console.log(`Current Time: ${this.song.startTime}`);

    const program = _.clone(this._programBlueprint).map(([time, action]) =>
      [time - seconds, action]);

    DEBUG && program.forEach(([time, action]) => logScheduleItem({ action, time }));

    this.start(program, { at: seconds });
  }

  jumpTo(seconds) {
    this.resetClock();

    this.song.reset();

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

  start(program, { at } = {}) {
    for (let [time, action] of program) {
      this.parseActions(action).forEach(action =>
        (time > 0) && this.clock.setTimeout(action, time)
      );
    }

    this.clock.start();
    this.song.start(at);
  }

  stop() {
    this.clock.stop();
    this.song.stop();
  }

  static start({ song, program }) {
    const show = new Show({ song, program });

    show.start(program);
    show.jumpTo(0);

    return show;
  }
}
