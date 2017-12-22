import { Observable, Scheduler } from 'rxjs/Rx'

const HUD = {
  start(show) {
    const $audioTime = document.querySelector('#audio_time')

    Observable.of(0, Scheduler.animationFrame)
      .repeat()
      .subscribe(() => ($audioTime.innerHTML = `${show.song.currentTime.toFixed(1)}`))
  },
}

export default HUD
