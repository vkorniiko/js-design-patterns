"use strict";

class WheelModel {
  constructor() {
    this.rotations = 0;
  }

  rotate(rotations) {
    return this.rotations += rotations;
  }
}

module.exports = WheelModel;
