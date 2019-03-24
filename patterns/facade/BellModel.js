"use strict";

class BellModel {
  constructor() {
    this.isRang = false;
  }

  ring() {
    return this.isRang = true;
  }
}

module.exports = BellModel;
