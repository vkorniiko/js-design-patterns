"use strict";

const ListIterator = require("./ListIterator");

class ES6ListIterator extends ListIterator {
  [Symbol.iterator]() {
    return {
      next: () => {
        const done = this.checkCompletion();
        const result = { value: this.getCurrent(), done: done };

        if (!done)
          this.moveNext();

        return result;
      }
    };
  }
}

module.exports = ES6ListIterator;
