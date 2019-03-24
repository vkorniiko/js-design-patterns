"use strict";

const BaseCommand = require("./BaseCommand");
const TaskExecutor = require("./TaskExecutor");

class ReminderCommand extends BaseCommand {
  constructor(executor) {
    if (!(executor instanceof TaskExecutor))
      throw new Error("Invalid argument 'executor'.");

    super();
    this.executor = executor;
  }
  execute() {
    let result = false;

    if (this.checkPermission()) {
      this.executor.runAction();
      result = true;
    }

    return result;
  }
  cancel() {
    if (this.executor.runTime)
      this.executor.runTime = null;
  }
}

module.exports = ReminderCommand;
