"use strict";

const BaseRocketState = require("./BaseRocketState");
const RocketFlyingState = require("./RocketFlyingState");

class RocketFlyingUpState extends BaseRocketState {
  constructor() {
    super("partiallyFull");
  }
  fly(context) {
    context.state = new RocketFlyingState();
  }
}

module.exports = RocketFlyingUpState;
