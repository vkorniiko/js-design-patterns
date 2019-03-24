"use strict";

const BaseRocketState = require("./BaseRocketState");
const RocketFlyingUpState = require("./RocketFlyingUpState");

class RocketStandingState extends BaseRocketState {
  constructor() {
    super("full");
  }
  flyUp(context) {
    context.state = new RocketFlyingUpState();
  }
}

module.exports = RocketStandingState;
