// import Effect from './effects';
import { Effect } from './effects.js';
// console.log('Effect', Effect);

// Mo.js utility
const Timeline = {
  set(...items) {
    if (items.length === 1) {
      items = [items];
    }
    const timeline = new mojs.Timeline();
    timeline.add(...items);
    return timeline;
  }
};

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

class DoubleCircle extends Effect {
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

// Made of circles
class Starburst {
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

function getRandomCoords() {
  const padding = 60;
  const yMax = window.innerHeight;
  const xMax = window.innerWidth;

  return {
    x: _.random(padding, xMax),
    y: _.random(padding, yMax)
  };
}

function orangeBlast() {
  burst(Object.assign(
    {
      size: _.random(100, 150),
    },
    getRandomCoords()
  ));
}

function blueBlast() {
  const opts = Object.assign(
    {
      size: _.random(50, 200),
      color: 'rgba(49, 153, 249, 0.5)'
    }, getRandomCoords()
  );
  burst(opts);
}

function burst(opts) {
  new Starburst(opts).play();
}

function greenBlast() {
  const size = _.random(50, 200);
  burst(Object.assign(
    {
      size: size,
      sizeStart: _.max(size/6, 30),
      color: 'rgba(49, 233, 149, 0.5)'
    },
    getRandomCoords()
  ));
}

// ========
// Controls
// --------
/*
Keys:
 [z] - draw orange burst
 [x] - draw blue burst
 [c] - draw green burst
*/

document.addEventListener('click', function(e) {
  const newStarburst = new Starburst();
  newStarburst.moveToCoords({ x: e.pageX, y: e.pageY });
}, false);

window.addEventListener('keydown', function (event) {
  if (event.key === 'z') {
    orangeBlast();
  } else if (event.key === 'x') {
    blueBlast();
  } else if (event.key === 'c') {
    greenBlast();
  }
  switch(event.key) {
    case 'z':
      orangeBlast();
      break;
    case 'x':
      blueBlast();
      break;
    case 'c':
      greenBlast();
      break;
  }
});
