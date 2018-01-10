import WAAClock from 'waaclock'

import { getAudioData } from './audio'

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

  reset() {
    // Creates a sound source
    const newSource = this.context.createBufferSource()
    // Tell the source which sound to play
    newSource.buffer = this.buffer
    // Connect the source to the context's desti
    newSource.connect(this.context.destination)

    this.stop()

    this.source = newSource

    return this
  }

  get currentTime() {
    return this.context.currentTime - this.startTime + this.startTimeRel
  }

  static from({ songName }) {
    return getSongFromUrl(`http://localhost:3000/sound/${songName}`)
  }
}

async function getSongFromUrl(url) {
  const { buffer, source, context } = await getAudioData(url)
  const clock = new WAAClock(context)
  return new Song({ buffer, source, context, clock })
}

export default Song
