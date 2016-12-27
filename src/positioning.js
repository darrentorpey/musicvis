function getRandomScreenCoords() {
  const padding = 60;
  const yMax = window.innerHeight;
  const xMax = window.innerWidth;

  return {
    x: _.random(padding, xMax),
    y: _.random(padding, yMax)
  };
}

export {
    getRandomScreenCoords
}
