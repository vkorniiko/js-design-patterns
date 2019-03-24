"use strict";

const BaseObserver = require("./BaseObserver");

class BaseEmitter {
  constructor() {
    if (new.target === BaseEmitter)
      throw new Error("Can't instantiate abstract type.");
    this.observers = [];
  }

  attach(observer) {
    if (!(observer instanceof BaseObserver))
      throw new Error("Invalid argument 'observer'.");
    this.observers.push(observer);
  }

  detach(observer) {
    if (!(observer instanceof BaseObserver))
      throw new Error("Invalid argument 'observer'.");
    const idx = this.observers.indexOf(observer);
    this.observers.splice(idx, 1);
  }

  notify() {
    this.observers.forEach(o => o.update());
  }
}

module.exports = BaseEmitter;
