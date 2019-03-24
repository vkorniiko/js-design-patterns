"use strict";

const BaseCommand = require("./BaseCommand");

class CalendarInitiator {
  constructor() {
    this.command = null;
  }
  invoke() {
    if (!(this.command instanceof BaseCommand))
      throw new Error("Invalid property 'command'.");

    if (!this.command.execute())
      this.command.cancel();
  }
}

module.exports = CalendarInitiator;
