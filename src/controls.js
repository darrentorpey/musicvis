import { Starburst, WaterBurst } from './effects.js';
import { BubbleField } from './shows.js';
import { getRandomScreenCoords } from './positioning.js';
import { blueBlast, orangeBlast, greenBlast } from './effects.js';

export function bindToKeys() {
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
}

export function bindToClicks() {
    document.addEventListener('click', function(e) {
      const newStarburst = new Starburst();

      newStarburst.moveToCoords({ x: e.pageX, y: e.pageY });

      if (window.clock) {
        var time = window.clock.context.currentTime.toString().match(/[0-9]+.?[0-9]{0,2}/);
        console.log('Time was', time[0]);
      }
    }, false);
}