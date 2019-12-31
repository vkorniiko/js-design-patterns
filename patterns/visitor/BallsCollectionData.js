"use strict";

const BaseballBall = require("./BaseballBall");
const FootballBall = require("./FootballBall");

class BallsCollectionData {
  constructor() {
    this.balls = [];
    const footBallBallsCount = 10;
    const baseBallBallsCount = 10;

    for (let i = 0; i < footBallBallsCount; ++i)
      this.balls.push(new FootballBall());

    for (let i = 0; i < baseBallBallsCount; ++i)
      this.balls.push(new BaseballBall());
  }
}

module.exports = BallsCollectionData;
