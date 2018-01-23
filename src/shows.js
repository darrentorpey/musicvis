import { clone, isFunction } from 'lodash-es'

import { fireEffect } from './orchestrator'

import volumeX from '../assets/volume-x.svg'
import volume2 from '../assets/volume-2.svg'

const DEBUG = false

function logScheduleItem({ action, time }) {
  console.log(`[${time}] [${action}]`)
}

function drawSvgIcon(target, path) {
  document.querySelector(target).innerHTML = `<img src="${path}" />`
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

  toggleMute() {
    drawSvgIcon('#sound_status', this.song.toggleMute() ? volume2 : volumeX)
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

  parseAction(row) {
    const actions = []

    row.split('|').forEach(a => {
      const match = a.match(/(.*)\*(\d)/)
      if (match) {
        const [, effect, num] = match
        Array(parseInt(num))
          .fill()
          .forEach(() => actions.push(effect))
      } else {
        actions.push(a)
      }
    })

    return actions
  }

  parseActions(action) {
    if (isFunction(action)) {
      console.log('action', action)
      return [action]
    } else {
      return this.parseAction(action).map(action => () => fireEffect(action))
    }
  }

  start(program, { at } = {}) {
    for (const [time, action] of program) {
      this.parseActions(action).forEach(action => time > 0 && this.clock.setTimeout(action, time))
    }

    this.song.setVolume(0.1)
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

    // setTimeout(() => {
    show.start(program)
    show.jumpTo(startAt)
    // })

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
