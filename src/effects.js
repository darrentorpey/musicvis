// Base class for complex effects
class Effect {
  constructor() {
    this._elements = [];
  }

  registerElement(...elements) {
    this._elements = this._elements.concat(elements);
  }

  moveTo(coords) {
    this.elements.forEach((el) => {
      el.tune(coords);
    });
  }

  get elements() {
    return this._elements;
  }
}

export class DoubleCircle extends Effect {
  constructor(opts = {}) {
    super();

    opts = Object.assign(
      {
        color: 'rgba(249, 153, 49, 0.5)'
      },
      opts
    );

    this.mainCircle = blastWaveShape(opts);

    this.registerElement(this.mainCircle);
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
