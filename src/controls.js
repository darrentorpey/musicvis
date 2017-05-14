import { BubbleField, Starburst, WaterBurst } from 'effects';
import { getRandomScreenCoords } from 'positioning';
import { blueBlast, orangeBlast, greenBlast } from 'effects';

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
        case 't':
          const time = _show.song.currentTime.toString().match(/[0-9]+.?[0-9]{0,2}/)[0];
          console.log('Time was', time);
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
            const time = window.clock.context.currentTime.toString().match(/[0-9]+.?[0-9]{0,2}/);
            console.log('Time was', time[0]);
        }
    }, false);
}
