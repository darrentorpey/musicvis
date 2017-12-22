import { getArrayBuffer } from 'assets'

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
  try {
    const context = new AudioContext()
    const buffer = await context.decodeAudioData(audioData)
    const source = createBufferSource(context, buffer)

    return { context, buffer, source }
  } catch (e) {
    throw new Error(`Error with decoding audio data ${e.err}`)
  }
}

export async function getAudioData(url) {
  const audioData = await getArrayBuffer(url)
  return await newDecodedSource(audioData)
}
