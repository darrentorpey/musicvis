import WAAClock from 'waaclock'

import { createBufferSource, getAudioData } from './audio'

/**
 * ================
 * Songs and clocks
 * ----------------
 */

class Song {
  constructor({ buffer, source, context, clock }) {
    this.buffer = buffer
    this.source = source
    this.context = context
    this.clock = clock
    this.startTime = null
  }

  stop() {
    this.source.stop()
  }

  start(at = 0) {
    this.source.start(0, at)
    this.startTime = this.context.currentTime
    this.startTimeRel = at

    return this
  }

  get volume() {
    return this.source.gainNode.gain.value
  }

  setVolume(val) {
    this.source.gainNode.gain.setValueAtTime(val, this.context.currentTime)

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
    const newSource = createBufferSource(this.context, this.buffer)

    this.stop()

    this.source = newSource

    return this
  }

  get currentTime() {
    return this.context.currentTime - this.startTime + this.startTimeRel
  }

  static async fromUrl(url) {
    const { buffer, context, source } = await getAudioData(url)
    const clock = new WAAClock(context)
    return new Song({ buffer, source, context, clock })
  }
}

export default Song
