"use strict";

const BaseEmitter = require("./BaseEmitter");

class TimeoutEmitter extends BaseEmitter {
  getTime() {
    return new Date();
  }

  run() {
    const timeout = 100;
    setTimeout(() => this.notify(), timeout);
  }
}

module.exports = TimeoutEmitter;
