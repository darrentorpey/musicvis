import { getAudioData } from 'audio';
import WAAClock from 'waaclock';

/**
 * ================
 * Songs and clocks
 * ----------------
 */

export class Song {
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
    const newSource = this.context.createBufferSource(); // creates a sound source
    newSource.buffer = this.buffer;                    // tell the source which sound to play
    newSource.connect(this.context.destination);       // connect the source to the context's desti

    this.stop();

    this.source = newSource;

    return this;
  }
}

async function getSongFromUrl(url) {
  const { buffer, source, context } = await getAudioData(url);
  const clock = new WAAClock(context);
  return new Song({ buffer, source, context, clock });
}

export function getAudioClock({ url } = {}) {
  if (url) {
    return getSongFromUrl(url);
  }
}

export function startSong(songName) {
  return getAudioClock({ url: `/sound/${songName}` });
}
