"use strict";

const BaseBallVisitor = require("./BaseBallVisitor");
const BaseballBall = require("./BaseballBall");
const BaseBall = require("./BaseBall");

class ThrowBallVisitor extends BaseBallVisitor {
  visitFootballBall(baseBall) { } 

  visitBaseballBall(baseBall) {
    if (!(baseBall instanceof BaseBall))
      throw new Error("Invalid argument 'baseBall'.");

    baseBall.movingState = BaseballBall.movingStates.throwed;
    baseBall.height = 30;
    baseBall.distance = 40;
  }
}

module.exports = ThrowBallVisitor;
