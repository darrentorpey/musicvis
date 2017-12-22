// @ts-check
import { random } from 'lodash-es'

import { Timeline } from './scheduling'
import { getRandomScreenCoords } from './positioning'
import mojs from 'mo-js'
import Pool from './pool'

// Base class for complex effects
export class Effect {
  constructor() {
    this._elements = []
    this.timeline = new mojs.Timeline()
  }

  registerElement(...elements) {
    elements.forEach(el => this.timeline.add(el))

    this._elements = this._elements.concat(elements)
  }

  moveTo(coords) {
    this._elements.forEach(el => {
      el.tune(coords)
    })
    return this
  }

  regenerate() {
    this._elements.forEach(el => el.generate())
    return this
  }

  replay() {
    this.timeline.replay()
    return this
  }

  get elements() {
    return this._elements
  }
}

function blastWaveShape({
  speed = 2000,
  size = 120,
  sizeStart = size / 4,
  color = 'white',
  colorTo = 'black', // rgba(234, 197, 178, 0.2)
  x = 0,
  y = 0,
}) {
  return new mojs.Shape({
    left: x,
    top: y,
    count: 10,
    stroke: color,
    strokeWidth: 50,
    fill: colorTo,
    scale: { 0: 1.5, easing: 'elastic.out' },
    radius: { [sizeStart]: size },
    duration: speed,
    opacity: { 1: 0 },
  })
}

export class DoubleCircle extends Effect {
  constructor(opts = {}) {
    super()

    this.registerElement(blastWaveShape(opts))
  }
}

// Made of circles
export class Starburst {
  constructor(opts = {}) {
    this.__id = parseInt(new Date())
    this.initSet(opts)
  }

  initSet(opts) {
    this.circle = new DoubleCircle(opts)

    this.timeline = Timeline.set(this.circle.elements)
  }

  moveTo(coords) {
    this.circle.moveTo(coords)
  }

  play() {
    this.timeline.replay()
  }

  moveToCoords(coords) {
    this.moveTo(coords)

    this.timeline.replay()

    return this
  }
}

const SWIRL_OPTS = {
  left: 0,
  top: 0,
  fill: '#F93E39',
  duration: 'rand(600, 1000)',
  radius: 'rand(10, 20)',
  pathScale: 'rand(.5, 1)',
  swirlFrequency: 'rand(2,4)',
  swirlSize: 'rand(6,14)',
  onPlaybackComplete() {
    $(this.el).remove()
  },
}

export class BubbleField extends Effect {
  constructor(opts = { y: 250 }) {
    super()

    this.registerElement(...this.makeBursts(opts))
  }

  makeBursts(opts) {
    opts = {
      height: 150,
      ...opts,
    }

    const xCoords = [1, 2, 3, 4, 5, 6, 7, 8].map(i => ({
      fill: '#6d89fd',
      duration: `rand(200, ${_.random(400, 1200)})`,
      x: 50 + i * 150,
      y: { [opts.y]: opts.y - opts.height },
    }))

    return xCoords.map(props => new WaterBurst(props))
  }

  play() {
    this.replay()
  }
}

export class WaterBurst extends Effect {
  static play() {
    const waterBurst = new WaterBurst({ fill: '#4d89fd' })
    waterBurst.play()
  }

  constructor(opts) {
    super()

    this.swirl1 = new mojs.ShapeSwirl({
      ...SWIRL_OPTS,
      ...opts,
    })

    this.swirl2 = new mojs.ShapeSwirl({
      ...SWIRL_OPTS,
      ...opts,
      direction: -1,
    })

    this.swirl3 = new mojs.ShapeSwirl({
      ...SWIRL_OPTS,
      ...opts,
    })

    this.swirl4 = new mojs.ShapeSwirl({
      ...SWIRL_OPTS,
      ...opts,
    }).then((...args) => {
      console.log('args', args)
    })

    this.registerElement(this.swirl1, this.swirl2, this.swirl3, this.swirl4)

    this.timeline = Timeline.set([
      this.swirl1,
      this.swirl2,
      this.swirl3,
      this.swirl4,
    ])
  }

  play() {
    var { x, y: y } = getRandomScreenCoords(0)
    // y = window.innerHeight * .99;
    y = window.innerHeight * 1.05

    this.moveTo({ x, y: { [y]: y - 200 } })
      .regenerate()
      .replay()
  }
}

const pools = {
  waterBurst: new Pool(),
  blueBlast: new Pool(),
  greenBlast: new Pool(),
  orangeBlast: new Pool(),
  lightBlueBlast: new Pool(),
}

window.pools = pools

/**
 * ~~~~~~~~~~~~~~
 * Fill the pools
 * ~~~~~~~~~~~~~~
 */
for (let i = 0; i < 10; i++) {
  const size = _.random(2, 8)
  const pixelSize = size * 25

  pools.greenBlast.add(
    new Starburst({
      size: pixelSize,
      sizeStart: _.max(pixelSize / 6, 45),
      speed: 2000 - pixelSize,
      color: 'rgba(49, 233, 149, 0.5)',
    })
  )

  pools.blueBlast.add(
    new Starburst({
      size: _.random(50, 200),
      color: 'rgba(49, 153, 249, 0.5)',
    })
  )

  pools.orangeBlast.add(
    new Starburst({
      size: _.random(100, 150),
      color: 'rgba(249, 153, 49, 0.5)',
    })
  )

  pools.lightBlueBlast.add(
    new Starburst({
      size: _.random(50, 200),
      color: 'rgba(95, 210, 251, 0.5)',
    })
  )
}

for (let i = 0; i < 30; i++) {
  pools.waterBurst.add(new WaterBurst({ fill: '#4d89fd' }))
}

/**
 * Makes a blaster function for the given effect
 * A blaster gets a random blast from the pool and fires it at a random location on the screen
 */
function blaster(effectName) {
  return () => pools[effectName].next().moveToCoords(getRandomScreenCoords())
}

/**
 * Makes a player for the given effect
 */
function player(effectName) {
  return () => pools[effectName].next().play()
}

const randomSplashEvents = [
  'greenBlast',
  'blueBlast',
  'orangeBlast',
  'lightBlueBlast',
]

const Effects = _.fromPairs([
  ['waterBurst', player('waterBurst')],
  ...randomSplashEvents.map(eff => [eff, blaster(eff)]),
])

window._Effects = Effects

export { Effects }
