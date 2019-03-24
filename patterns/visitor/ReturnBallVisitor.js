"use strict";

const BaseBallVisitor = require("./BaseBallVisitor");
const BaseballBall = require("./BaseballBall");
const FootballBall = require("./FootballBall");
const BaseBall = require("./BaseBall");

class ReturnBallVisitor extends BaseBallVisitor {
  returnBall(baseBall) {
    baseBall.height = 0;
    baseBall.distance = 0;
  }

  visitFootballBall(baseBall) {
    if (!(baseBall instanceof BaseBall))
      throw new Error("Invalid argument 'baseBall'.");

    baseBall.movingState = FootballBall.movingStates.lying;
    this.returnBall(baseBall);
  }

  visitBaseballBall(baseBall) {
    if (!(baseBall instanceof BaseBall))
      throw new Error("Invalid argument 'baseBall'.");

    baseBall.movingState = BaseballBall.movingStates.lying;
    this.returnBall(baseBall);
  }
}

module.exports = ReturnBallVisitor;
