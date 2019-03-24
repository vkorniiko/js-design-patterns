"use strict";

class BaseObserver {
  constructor() {
    if (new.target === BaseObserver)
      throw new Error("Can't instantiate abstract type.");
  }

  update() {
    throw new Error("Not implemented.");
  }
}

module.exports = BaseObserver;
