"use strict";

const TimeoutEmitter = require("./TimeoutEmitter");
const BaseObserver = require("./BaseObserver");

class LoggerObserver extends BaseObserver {
  constructor(timeoutEmitter) {
    super();

    if (!(timeoutEmitter instanceof TimeoutEmitter))
      throw new Error("Invalid argument 'timeoutEmitter'.");

    this.lastUpdateTime = null;
    this.emitter = timeoutEmitter;
    this.emitter.attach(this);
  }

  update() {
    const emitter = this.emitter;
    this.lastUpdateTime = emitter.getTime();
  }
}

module.exports = LoggerObserver;
