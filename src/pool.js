class Pool {
  constructor(items = []) {
    this._items = items
    this.pointer = -1
  }

  *nextPointer() {
    if (++this.pointer >= this._items.length) {
      this.pointer = 0
    }
    yield this.pointer
  }

  /**
   * @param {any} item - an item to add
   */
  add(item) {
    this._items.push(item)
  }

  next() {
    return this._items[this.nextPointer().next().value]
  }
}

export default Pool
