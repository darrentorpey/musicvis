import { Starburst } from './effects.js';
import WaterBursts from './shows.js';
import { getRandomScreenCoords } from './positioning.js'

function play(effect, opts) {
  new Starburst(opts).play();
}

function burst(opts) {
  new Starburst(opts).play();
}

function orangeBlast() {
  play(Starburst, {
    size: _.random(100, 150),
    ...getRandomScreenCoords()
  });
}

function blueBlast() {
  play(Starburst, {
    size:  _.random(50, 200),
    color: 'rgba(49, 153, 249, 0.5)',
    ...getRandomScreenCoords()
  });
}

function greenBlast() {
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

/*
 ========
 Controls
 --------
 Keys:
  [z] - draw orange burst
  [x] - draw blue burst
  [c] - draw green burst
*/

document.addEventListener('click', function(e) {
  const newStarburst = new Starburst();
  newStarburst.moveToCoords({ x: e.pageX, y: e.pageY });
}, false);

window.addEventListener('keydown', function(e) {
  switch(e.key) {
    case 'z':
      orangeBlast();
      break;
    case 'x':
      blueBlast();
      break;
    case 'c':
      greenBlast();
      break;
    case 'w':
      WaterBursts.play();
      break;
  }
});


