import { Starburst } from './effects.js';

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
  burst({
    size: _.random(100, 150),
    ...getRandomCoords()
  });
}

function blueBlast() {
  burst({
    size: _.random(50, 200),
    color: 'rgba(49, 153, 249, 0.5)',
    ...getRandomCoords()
  });
}

function burst(opts) {
  new Starburst(opts).play();
}

function greenBlast() {
  const size = _.random(50, 200);

  burst({
    size: size,
    sizeStart: _.max(size/6, 30),
    color: 'rgba(49, 233, 149, 0.5)',
    ...getRandomCoords()
  });
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
