"use strict";

class BaseCommand {
  constructor() {
    if (new.target === BaseCommand)
      throw new Error("Can't instantiate abstract type.");

    this.permissionGranted = false;
  }
  checkPermission() {
    return this.permissionGranted;
  }
  execute() {
    throw new Error("Not implemented.");
  }
}

module.exports = BaseCommand;
