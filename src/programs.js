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
    [   4.88, 'boom_blue' ],
    [   8.83, 'boom_blue' ],
    [  12.63, 'boom_blue'   ],
    [  16.63, 'boom_lightblue'  ],
    [  20.38, 'boom_blue'   ],
    ...from(24)
        .to(28)
        .every(0.20)
        .add('water|water|water|water|water'),
    [  24.55, 'boom_blue' ],
    [  28.48, 'boom_lightblue'  ],
    [  29.48, 'boom_lightblue'  ],
    [  30.40, 'boom_blue'  ],
    [  31.38, 'boom_lightblue'  ],
    [  32.39, 'boom_lightblue'  ],
    [  33.35, 'boom_lightblue'  ],
    [  34.35, 'boom_blue'  ],
    [  35.33, 'boom_blue'  ],
    [  36.28, 'boom_lightblue'  ],
    [  60.00, 'boom_lightblue|water|water|water'  ],
  ]
}
