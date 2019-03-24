"use strict";

class BrakeModel {
  constructor() {
    this.isEnabled = true;
  }
  enable() {
    return this.isEnabled = true;
  }
  disable() {
    return this.isEnabled = false;
  }
}

module.exports = BrakeModel;
