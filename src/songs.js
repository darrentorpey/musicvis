import { getAudioData } from 'audio';
import WAAClock from 'waaclock';

/**
 * ================
 * Songs and clocks
 * ----------------
 */

export default class Song {
  constructor({ buffer, source, context, clock }) {
    this.buffer = buffer;
    this.source = source;
    this.context = context;
    this.clock = clock;
    this.startTime = null;
  }

  stop() {
    this.source.stop();
  }

  start(at = 0) {
    this.source.start(0, at);
    this.startTime = this.context.currentTime;

    return this;
  }

  reset() {
    // Creates a sound source
    const newSource = this.context.createBufferSource();
    // Tell the source which sound to play
    newSource.buffer = this.buffer;
    // Connect the source to the context's desti
    newSource.connect(this.context.destination);

    this.stop();

    this.source = newSource;

    return this;
  }

  static from({ songName }) {
    return getSongFromUrl(`/sound/${songName}`);
  }
}

async function getSongFromUrl(url) {
  const { buffer, source, context } = await getAudioData(url);
  const clock = new WAAClock(context);
  return new Song({ buffer, source, context, clock });
}
