// Base class for complex effects
export class Effect {
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
