import { getArrayBuffer } from './assets'
import areYouAwake from '../assets/are_you_awake.mp3'

/**
 * =============
 * Web Audio API
 * -------------
 */

function createBufferSource(context, buffer) {
  const audioTrack = context.createBufferSource()

  audioTrack.connect(context.destination)
  audioTrack.buffer = buffer

  return audioTrack
}

async function newDecodedSource(audioData) {
  console.log('audioData', audioData)
  try {
    const context = new AudioContext()
    const buffer = await context.decodeAudioData(audioData)
    const source = createBufferSource(context, buffer)

    return { context, buffer, source }
  } catch (e) {
    throw new Error(`Error with decoding audio data ${e}`)
  }
}

/**
 * Creates an AudioBuffer for the audio file at the given URL
 * @param {string} url  the URL whose content will be buffered
 * @return {Promise}
 */
export async function getAudioData(url) {
  const audioData = await getArrayBuffer(url)
  return await newDecodedSource(audioData)
}

export async function getAreYouAwake() {
  const audioData = await getArrayBuffer(areYouAwake)
  return await newDecodedSource(audioData)
}
