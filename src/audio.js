class Song {
  constructor(buffer, source, context) {
    this.buffer = buffer;
    this.source = source;
    this.context = context;
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

  replay(at = 0) {
    const newSource = this.context.createBufferSource(); // creates a sound source
    newSource.buffer = this.buffer;                    // tell the source which sound to play
    newSource.connect(this.context.destination);       // connect the source to the context's desti

    this.source.stop();
    this.source = newSource;

    this.start(at);

    return this;
  }
}

export function getData(url) {
  return new Promise((resolve) => {
    var audioCtx = new AudioContext();
    var source = audioCtx.createBufferSource();
    var request = new XMLHttpRequest();

    request.open('GET', url, true);

    request.responseType = 'arraybuffer';

    request.send();

    request.onload = function() {
      audioCtx.decodeAudioData(request.response, function(buffer) {
          source.buffer = buffer;
          source.connect(audioCtx.destination);

          resolve(new Song(buffer, source, audioCtx));
        },
        (e) => `Error with decoding audio data ${e.err}`);
    }
  });
}

export function getAudioData(url) {
  return getData(url);
}

function getAudioClockFromUrl(url) {
  return getAudioData(url).then(song => {
    const clock = new WAAClock(song.context);

    clock.start();
    song.start();

    return { song, clock };
  });
}

export function getAudioClock(opts = {}) {
  if (opts.url) {
    return getAudioClockFromUrl(opts.url);
  }
}
