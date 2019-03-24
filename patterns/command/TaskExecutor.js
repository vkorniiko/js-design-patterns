"use strict";

class TaskExecutor {
  constructor() {
    this.runTime = null;
  }
  runAction() {
    return this.runTime = new Date();
  }
}

module.exports = TaskExecutor;
