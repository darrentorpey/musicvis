import { Effect, WaterBurst, blueBlast, lightBlueBlast, orangeBlast, greenBlast } from './effects';

const DEBUG = false;

export class BubbleField extends Effect {
  constructor(opts = { y: 250 }) {
    super();

    this.registerElement(...this.makeBursts(opts));
  }

  makeBursts(opts) {
    opts = {
      height: 150,
      ...opts
    }
    // const xCoords = [1,2,3,4,5].map(i => i * 150);
    const xCoords = [1,2,3,4,5,6,7,8].map(i => ({
      fill: '#6d89fd',
      duration: `rand(200, ${_.random(400, 1200)})`,
      x: 50 + (i * 150),
      y: { [opts.y]: opts.y - opts.height }
    }));

    return xCoords.map(props => new WaterBurst(props))
  }

  play() {
    this.replay();
  }
}

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
