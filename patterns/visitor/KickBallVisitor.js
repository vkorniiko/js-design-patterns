"use strict";

const BaseBallVisitor = require("./BaseBallVisitor");
const FootballBall = require("./FootballBall");
const BaseBall = require("./BaseBall");

/* eslint-enable no-unused-vars*/
class KickBallVisitor extends BaseBallVisitor {
  visitFootballBall(baseBall) {
    if (!(baseBall instanceof BaseBall))
      throw new Error("Invalid argument 'baseBall'.");

    baseBall.movingState = FootballBall.movingStates.kickedOut;
    baseBall.height = 20;
    baseBall.distance = 30;
  }

  visitBaseballBall(baseBall) { } /* eslint-disable-line no-unused-vars*/
}

module.exports = KickBallVisitor;
