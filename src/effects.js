import { Timeline } from './scheduling';
import { getRandomScreenCoords } from './positioning.js';

// Base class for complex effects
export class Effect {
  constructor() {
    this._elements = [];
    this.timeline = new mojs.Timeline();
  }

  registerElement(...elements) {
    elements.forEach(el => this.timeline.add(el));

    this._elements = this._elements.concat(elements);
  }

  moveTo(coords) {
    this._elements.forEach((el) => {
      el.tune(coords);
    });
    return this;
  }

  regenerate() {
    this._elements.forEach(el => el.generate());
    return this;
  }

  replay() {
    this.timeline.replay();
    return this;
  }

  get elements() {
    return this._elements;
  }
}

export class DoubleCircle extends Effect {
  constructor(opts = {}) {
    super();

    this.registerElement(
      blastWaveShape({
        color: 'rgba(249, 153, 49, 0.5)',
        ...opts
      })
    );
  }
}

function blastWaveShape({
  speed=2000,
  size=120,
  sizeStart=size/4,
  color='white',
  colorTo='black', // rgba(234, 197, 178, 0.2)
  x=0, y=0
}) {
  return new mojs.Shape({
    left: x, top: y,
    count: 10,
    // stroke: { '#e2441d' : '#f99931' },
    stroke: color,//'#e2441d', // color
    // stroke: { '#e2441d' : 'rgba(249, 153, 49, 0.5)' },
    // strokeWidth: { 50 : 0 },
    strokeWidth: 50,
    fill: colorTo,
    scale: { 0: 1.5, easing: 'elastic.out' },
    radius: { [sizeStart] : size },
    duration: speed,
    opacity:  { 1: 0 }
  });
}

// Made of circles
export class Starburst {
  constructor(opts = {}) {
    this.__id = parseInt(new Date());
    this.initSet(opts);
  }

  initSet(opts) {
    this.circle = new DoubleCircle(opts);

    this.timeline = Timeline.set( this.circle.elements );
  }

  moveTo(coords) {
    this.circle.moveTo(coords);
  }

  play() {
    this.timeline.replay();
  }

  moveToCoords(coords) {
    this.moveTo(coords);

    this.timeline.replay();
  }
}

const SWIRL_OPTS = {
  left: 0, top: 0,
  fill:           '#F93E39',
  duration:       'rand(600, 1000)',
  radius:         'rand(10, 20)',
  pathScale:      'rand(.5, 1)',
  swirlFrequency: 'rand(2,4)',
  swirlSize:      'rand(6,14)',
};

export class WaterBurst extends Effect {
  static play() {
    const waterBurst = new WaterBurst({ fill: '#4d89fd' });
    waterBurst.play();

    // new MojsPlayer({ add: waterBurst.timeline });
  }

  constructor(opts) {
    super();

    this.swirl1 = new mojs.ShapeSwirl({
      ...SWIRL_OPTS,
      ...opts
    });

    this.swirl2 = new mojs.ShapeSwirl({
      ...SWIRL_OPTS,
      ...opts,
      direction: -1
    });

    this.swirl3 = new mojs.ShapeSwirl({
      ...SWIRL_OPTS,
      ...opts
    });

    this.swirl4 = new mojs.ShapeSwirl({
      ...SWIRL_OPTS,
      ...opts
    });

    this.registerElement(this.swirl1, this.swirl2, this.swirl3, this.swirl4);

    this.timeline = Timeline.set([this.swirl1, this.swirl2, this.swirl3, this.swirl4]);
  }

  play() {
    var { x, y: y } = getRandomScreenCoords();
    y = window.innerHeight * .80;

    this
      .moveTo({ x, y: { [y]: y - 150 } })
      .regenerate()
      .replay();
  }
};

function play(effect, opts) {
  new Starburst(opts).play();
}

function burst(opts) {
  new Starburst(opts).play();
}

export function orangeBlast() {
  play(Starburst, {
    size: _.random(100, 150),
    ...getRandomScreenCoords()
  });
}

export function blueBlast() {
  play(Starburst, {
    size:  _.random(50, 200),
    color: 'rgba(49, 153, 249, 0.5)',
    ...getRandomScreenCoords()
  });
}

export function lightBlueBlast() {
  play(Starburst, {
    size:  _.random(50, 200),
    color: 'rgba(95, 210, 251, 0.5)',
    ...getRandomScreenCoords()
  });
}

export function greenBlast() {
  const size = _.random(2, 8);
  const pixelSize = size * 25;

  play(Starburst, {
    size:      pixelSize,
    sizeStart: _.max(pixelSize/6, 45),
    speed:     2000 - pixelSize,
    color:     'rgba(49, 233, 149, 0.5)',
    ...getRandomScreenCoords()
  });
}
