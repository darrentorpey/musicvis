export function getRandomScreenCoords(padding = 60) {
  return {
    x: _.random(padding, window.innerWidth),
    y: _.random(padding, window.innerHeight),
  };
}
