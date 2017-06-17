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
    [   0.40, 'boom_lightblue'  ],
    ...from(4.30)
      .to(24.30)
      .every(4.00)
        .add('boom_blue'),
    ...from(24)
      .to(102)
      .every(0.20)
        .add('water|water|water|water|water'),
    ...from(26.60)
      .to(101.30)
      .every(1.00)
        .add('boom_lightblue'),
    [  60.00, 'water|water|water|water|water'  ],
  ]
}
