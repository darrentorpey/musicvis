import { clone, isFunction } from 'lodash-es'

import { Effects } from './effects'

const { waterBurst, blueBlast, lightBlueBlast, orangeBlast, greenBlast } = Effects

const DEBUG = false

function logScheduleItem({ action, time }) {
  console.log(`[${time}] [${action}]`)
}

const actionShortcuts = {
  water: () => waterBurst(),
  boom_green: () => greenBlast(),
  boom_blue: () => blueBlast(),
  boom_lightblue: () => lightBlueBlast(),
  boom_orange: () => orangeBlast(),
}

class Show {
  /**
   * @param
   */
  constructor({ song, program }) {
    this.song = song
    this.clock = song.clock
    this._programBlueprint = clone(program)
  }

  resetClock() {
    this.clock.stop()
    this.clock._events = []
    this.clock.start()
  }

  getCurrentTime() {
    return this.song.currentTime.toString().match(/[0-9]+.?[0-9]{0,2}/)[0]
  }

  reschedule(seconds) {
    DEBUG && console.log(`Current Time: ${this.song.startTime}`)

    const program = clone(this._programBlueprint).map(([time, action]) => [time - seconds, action])

    DEBUG && program.forEach(([time, action]) => logScheduleItem({ action, time }))

    this.start(program, { at: seconds })
  }

  /**
   * @param {Number} seconds  meow
   */
  jumpTo(seconds) {
    this.resetClock()

    this.song.reset()

    this.reschedule(seconds)
  }

  parseActions(action) {
    if (isFunction(action)) {
      return [action]
    } else {
      const actions = action.split('|')
      return actions.map(action => actionShortcuts[action])
    }
  }

  start(program, { at } = {}) {
    for (const [time, action] of program) {
      this.parseActions(action).forEach(action => time > 0 && this.clock.setTimeout(action, time))
    }

    this.song.setVolume(0.2)
    this.clock.start()
    this.song.start(at)
  }

  stop() {
    this.clock.stop()
    this.song.stop()
  }

  /**
   * @param {Object} pims
   * @param {Number} pims.song  the song for the program
   * @param {Number} pims.program  the visual effects program
   * @param {Number} pims.startAt  the start point
   */
  static start({ song, program, startAt = new Number(0) }) {
    const show = Show.build({ song, program })

    show.start(program)
    show.jumpTo(startAt)

    return show
  }

  /**
   * @param {Song} song
   * @param {Program} program
   */
  static build({ song, program }) {
    return new this({ song, program })
  }
}

export default Show
