"use strict";

class BaseIterator {
  constructor() {
    if (new.target === BaseIterator)
      throw new Error("Can't instantiate abstract type.");
  }
  reset() {
    throw new Error("Not implemented.");
  }
  moveNext() {
    throw new Error("Not implemented.");
  }
  checkCompletion() {
    throw new Error("Not implemented.");
  }
  getCurrent() {
    throw new Error("Not implemented.");
  }
}

module.exports = BaseIterator;
