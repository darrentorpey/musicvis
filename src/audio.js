import { getArrayBuffer } from './assets'

/**
 * =============
 * Web Audio API
 * -------------
 */

export function createBufferSource(context, buffer) {
  const audioTrack = context.createBufferSource()
  const gainNode = context.createGain()

  audioTrack.gainNode = gainNode
  audioTrack.buffer = buffer

  audioTrack.connect(gainNode)
  gainNode.connect(context.destination)

  return audioTrack
}

async function newDecodedSource(audioData) {
  try {
    const context = new AudioContext()
    const buffer = await context.decodeAudioData(audioData)
    const source = createBufferSource(context, buffer)

    return { buffer, context, source }
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
