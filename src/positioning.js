import { random } from 'lodash-es'

export function getRandomScreenCoords(padding = 60) {
  return {
    x: random(padding, window.innerWidth),
    y: random(padding, window.innerHeight),
  }
}
