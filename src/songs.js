export class Song {
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
