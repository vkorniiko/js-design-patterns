"use strict";

const BaseRocketState = require("./BaseRocketState");
const RocketLandingState = require("./RocketLandingState");

class RocketFlyingState extends BaseRocketState {
  constructor() {
    super("partiallyEmpty");
  }
  land(context) {
    context.state = new RocketLandingState();
  }
}

module.exports = RocketFlyingState;
