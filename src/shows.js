import { Effect } from './effects';
import { getRandomScreenCoords } from './positioning.js';

const WaterBursts = {
  init: function() {
    const SWIRL_OPTS = {
      left: 0, top: 0,
      fill:           '#F93E39',
      duration:       'rand(600, 1000)',
      radius:         'rand(10, 20)',
      pathScale:      'rand(.5, 1)',
      swirlFrequency: 'rand(2,4)',
      swirlSize:      'rand(6,14)',
    };

    this.swirl1 = new mojs.ShapeSwirl({
      ...SWIRL_OPTS
    });

    this.swirl2 = new mojs.ShapeSwirl({
      ...SWIRL_OPTS,
      direction: -1
    });

    this.swirl3 = new mojs.ShapeSwirl({
      ...SWIRL_OPTS
    });

    this.swirl4 = new mojs.ShapeSwirl({
      ...SWIRL_OPTS
    });
  },

  play: function() {
    var { x, y: y } = getRandomScreenCoords();
    var yRange = { [y]: y - 150 };

    this.swirl1
      .tune({ x, y: yRange })
      .generate()
      .replay();

    this.swirl2
      .tune({ x, y: yRange })
      .generate()
      .replay();

    this.swirl3
      .tune({ x, y: yRange })
      .generate()
      .replay();

    this.swirl4
      .tune({ x, y: yRange })
      .generate()
      .replay();
  }
};

WaterBursts.init();

export default WaterBursts;
