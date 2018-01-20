import { getArrayBuffer } from './assets'

/**
 * =============
 * Web Audio API
 * -------------
 */

function createBufferSource(context, buffer) {
  const audioTrackSource = context.createBufferSource()
  const gainNode = context.createGain()

  audioTrackSource.gainNode = gainNode
  audioTrackSource.buffer = buffer

  audioTrackSource.connect(gainNode)
  gainNode.connect(context.destination)

  return audioTrackSource
}

async function newDecodedSource(audioData) {
  try {
    const context = new AudioContext()
    const buffer = await context.decodeAudioData(audioData)

    return createBufferSource(context, buffer)
  } catch (e) {
    throw new Error(`Error with decoding audio data ${e}`)
  }
}

/**
 * Returns a clone of the given audio source
 * @param {AudioSource} source  the audio source to clone
 * @return {AudioSource}
 */
export function cloneSource(source) {
  return createBufferSource(source.context, source.buffer)
}

/**
 * Creates an AudioBuffer for the audio file at the given URL
 * @param {string} url  the URL whose content will be buffered
 * @return {Promise}
 */
export async function getAudioSource(url) {
  const audioData = await getArrayBuffer(url)
  return newDecodedSource(audioData)
}
