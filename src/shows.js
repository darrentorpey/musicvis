import { Effect } from './effects';
import { Timeline } from './scheduling';
import { getRandomScreenCoords } from './positioning.js';

const SWIRL_OPTS = {
  left: 0, top: 0,
  fill:           '#F93E39',
  duration:       'rand(600, 1000)',
  radius:         'rand(10, 20)',
  pathScale:      'rand(.5, 1)',
  swirlFrequency: 'rand(2,4)',
  swirlSize:      'rand(6,14)',
};

class WaterBurst extends Effect {
  static play() {
    const waterBurst = new WaterBurst({ fill: 'blue' });
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
    var yRange = { [y]: y - 150 };
    this.moveTo({ x, y: yRange });
    this.regenerate();
    this.timeline.replay();
  }
};

export default WaterBurst;
