"use strict";

const BaseRocketState = require("./BaseRocketState");

class RocketLandingState extends BaseRocketState {
  constructor() {
    super("empty");
  }
}

module.exports = RocketLandingState;
