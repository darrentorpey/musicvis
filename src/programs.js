class Maker {
  constructor(start) {
    this.start = start
  }

  to(end) {
    this.end = end
    return this
  }

  every(interval) {
    this.interval = interval
    return this
  }

  add(instruction) {
    const instructions = []
    for (let t = this.start; t <= this.end; t += this.interval) {
      instructions.push([t, instruction])
    }
    return instructions
  }
}

function from(time) {
  return new Maker(time)
}

function program(events) {
  return {
    full: (startFrom = 0) => events.map(([v1, v2]) => [v1 - startFrom, v2]),
  }
}

export const BLANK = program([])

export const ARE_YOU_AWAKE = program([
  [0.26, 'boom_lightblue'],
  [0.89, 'boom_orange'],
  [1.57, 'boom_green'],
  [2.5, 'boom_green'],
  [7.5, 'boom_lightblue'],
  [7.9, 'boom_orange'],
  [8.4, 'boom_green'],
  ...from(7.5)
    .to(20)
    // .to(40)
    .every(0.2)
    .add('water|water|water|water|water'),
])

export const EXPLOSIONS_FIRST = {
  full(startFrom = 0) {
    return this.events.map(([v1, v2]) => [v1 - startFrom, v2])
  },
  events: [
    [0.4, 'boom_lightblue'],
    ...from(4.3)
      .to(24.3)
      .every(4.0)
      .add('boom_blue'),
    ...from(24)
      .to(102)
      .every(0.2)
      .add('water|water|water|water|water'),
    ...from(26.6)
      .to(101.3)
      .every(1.0)
      .add('boom_lightblue'),
    [60.0, 'water|water|water|water|water'],
  ],
}
