import mojs from 'mo-js';

// Mo.js utility
export const Timeline = {
  set(...items) {
    if (items.length === 1) {
      items = [items];
    }
    const timeline = new mojs.Timeline();
    timeline.add(...items);
    return timeline;
  }
};
