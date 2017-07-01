class Maker {
  constructor(start) {
    this.start = start;
  }

  to(end) {
    this.end = end;
    return this;
  }

  every(interval) {
    this.interval = interval;
    return this;
  }

  add(instruction) {
    const instructions = [];
    for (let t = this.start; t <= this.end; t += this.interval) {
      instructions.push([t, instruction]);
    }
    return instructions;
  }
}

function from(time) {
  return new Maker(time);
}

export const program = {
  full(startFrom = 0) {
    return this.events.map(([v1, v2]) => [v1 - startFrom, v2]);
  },
  events: [
    [0.4, 'boom_lightblue'],
    ...from(4.3).to(24.3).every(4.0).add('boom_blue'),
    ...from(24).to(102).every(0.2).add('water|water|water|water|water'),
    ...from(26.6).to(101.3).every(1.0).add('boom_lightblue'),
    [60.0, 'water|water|water|water|water'],
  ],
};
