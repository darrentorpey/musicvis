import { Starburst, WaterBurst } from './effects.js';
import { BubbleField } from './shows.js';
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
  if (window.clock) {
    var time = window.clock.context.currentTime.toString().match(/[0-9]+.?[0-9]{0,2}/);
    console.log('Time was', time[0]);
  }
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
      WaterBurst.play();
      break;
    case 'g':
      const bf = new BubbleField({ y: window.innerHeight * .80 });
      bf.play();
      break;
  }
});

function getData(url) {
  var audioCtx = new AudioContext();
  var source = audioCtx.createBufferSource();
  var request = new XMLHttpRequest();

  request.open('GET', url, true);

  request.responseType = 'arraybuffer';

  request.onload = function() {
    var audioData = request.response;

    audioCtx.decodeAudioData(audioData, function(buffer) {
        source.buffer = buffer;
        source.connect(audioCtx.destination);
      },

      function(e){"Error with decoding audio data" + e.err});

  }

  request.send();

  return source;
}

function getAudioClock(url) {
    var source = getData(url);
    var clock = new WAAClock(source.context);
    clock.start();
    source.start();
    return clock;
}

window.clock = getAudioClock('http://localhost:3000/sound/first_breath.mp3');

function atTime(time, action) {
  window.clock.callbackAtTime(action, time);
}

atTime(  1.00, WaterBurst.play );
atTime(  4.88, WaterBurst.play );
atTime(  8.83, WaterBurst.play );
atTime( 12.63, WaterBurst.play );
atTime( 16.63, WaterBurst.play );
atTime( 20.38, WaterBurst.play );
atTime( 24.55, WaterBurst.play );
atTime( 28.48, WaterBurst.play );
