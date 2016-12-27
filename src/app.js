import { DoubleCircle } from './effects.js';

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
