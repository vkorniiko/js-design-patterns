"use strict";

const BaseballBall = require("./BaseballBall");
const FootballBall = require("./FootballBall");

class BallsCollectionData {
  constructor() {
    this.footballBalls = [];
    this.baseballBalls = [];
    const ballsCount = 10;

    for (let i = 0; i < ballsCount; ++i)
      this.footballBalls.push(new FootballBall());

    for (let i = 0; i < ballsCount; ++i)
      this.baseballBalls.push(new BaseballBall());
  }
}

module.exports = BallsCollectionData;
