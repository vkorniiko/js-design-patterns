"use strict";

const RocketStandingState = require("./RocketStandingState");

class RocketContext {
  constructor() {
    this.state = new RocketStandingState();
  }

  flyUp() {
    this.state.flyUp(this);
  }

  fly() {
    this.state.fly(this);
  }

  land() {
    this.state.land(this);
  }

  getFuelQuantity() {
    return this.state.fuelQuantity;
  }
}

module.exports = RocketContext;
