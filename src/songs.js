import WAAClock from 'waaclock'

import { cloneSource, getAudioSource } from './audio'

/**
 * ================
 * Songs and clocks
 * ----------------
 */

class Song {
  constructor({ source, clock }) {
    this.source = source
    this.clock = clock
    this.startTime = null
  }

  stop() {
    this.source.stop()
  }

  start(at = 0) {
    this.source.start(0, at)
    this.startTime = this.source.context.currentTime
    this.startTimeRel = at

    return this
  }

  get volume() {
    return this.source.gainNode.gain.value
  }

  setVolume(val) {
    this.source.gainNode.gain.setValueAtTime(val, this.source.context.currentTime)

    return this
  }

  mute() {
    this.oldVolume = this.source.gainNode.gain.value
    this.muted = true
    this.setVolume(0)
  }

  unmute() {
    this.muted = false
    this.setVolume(this.oldVolume)
  }

  toggleMute() {
    this.volume ? this.mute() : this.unmute()

    return !this.muted
  }

  reset() {
    this.stop()

    this.source = cloneSource(this.source)

    return this
  }

  resetTo(spot) {
    this.reset()
    this.start(spot)
  }

  get currentTime() {
    return this.source.context.currentTime - this.startTime + this.startTimeRel
  }

  static async fromUrl(url) {
    const source = await getAudioSource(url)
    const clock = new WAAClock(source.context)
    return new Song({ source, clock })
  }
}

export default Song
