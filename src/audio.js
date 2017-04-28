import axios from 'axios';
import { Song } from 'songs';

function createBufferSource(audioCtx, buffer) {
  const audioTrack = audioCtx.createBufferSource();

  audioTrack.connect(audioCtx.destination);
  audioTrack.buffer = buffer;

  return audioTrack;
}

function newDecodedSource(audioData) {
  const audioCtx = new AudioContext();

  return new Promise((resolve) => {
    audioCtx.decodeAudioData(audioData, buffer => {
      const source = createBufferSource(audioCtx, buffer);

      resolve([audioCtx, buffer, source]);
    },
    (e) => `Error with decoding audio data ${e.err}`
    );
  });
}

function playAudio(audioCtx, buffer, offsetInSeconds, duration) {
  audioTrack.start(audioCtx.currentTime, offsetInSeconds,  duration);
}

export function getAudioData(url) {
  return axios({
    method:       'get',
    url:          url,
    responseType: 'arraybuffer'
  }).then(({ data }) =>
    newDecodedSource(data).then(([ audioCtx, buffer, source ]) =>
      new Song(buffer, source, audioCtx))
  )
}

function getAudioClockFromUrl(url) {
  return getAudioData(url).then(song => {
    const clock = new WAAClock(song.context);

    clock.start();
    song.start();
    song.clock = clock;

    return song;
  });
}

export function getAudioClock(opts = {}) {
  if (opts.url) {
    return getAudioClockFromUrl(opts.url);
  }
}
