import { Effect, WaterBurst } from './effects';

function initElements(inputs) {

}

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

