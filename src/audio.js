import axios from 'axios';
import { Song } from 'songs';
import WAAClock from 'waaclock';

function createBufferSource(audioCtx, buffer) {
  const audioTrack = audioCtx.createBufferSource();

  audioTrack.connect(audioCtx.destination);
  audioTrack.buffer = buffer;

  return audioTrack;
}

async function newDecodedSource(audioData) {
  try {
    const audioCtx = new AudioContext();
    const buffer = await audioCtx.decodeAudioData(audioData);
    const source = createBufferSource(audioCtx, buffer);

    return { audioCtx, buffer, source };
  } catch(e) {
    throw new Error(`Error with decoding audio data ${e.err}`)
  }
}

function playAudio(audioCtx, buffer, offsetInSeconds, duration) {
  audioTrack.start(audioCtx.currentTime, offsetInSeconds,  duration);
}

async function getArrayBuffer(url) {
  const { data } = await axios({
    url,
    method: 'get',
    responseType: 'arraybuffer'
  });

  return data;
}

export async function getAudioData(url) {
  const audioData = await getArrayBuffer(url);
  const { buffer, source, audioCtx } = await newDecodedSource(audioData);

  return new Song(buffer, source, audioCtx);
}

async function getAudioClockFromUrl(url) {
  const song = await getAudioData(url);
  const clock = new WAAClock(song.context);

  clock.start();
  song.start();
  song.clock = clock;

  return song;
}

export function getAudioClock(opts = {}) {
  if (opts.url) {
    return getAudioClockFromUrl(opts.url);
  }
}
