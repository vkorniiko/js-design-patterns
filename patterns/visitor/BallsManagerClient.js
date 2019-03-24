"use strict";

const BallsCollectionData = require("./BallsCollectionData");

class BallsManagerClient {
  constructor() {
    this.data = new BallsCollectionData();
  }

  performDynamicActionOnAllBalls(visitor) {
    this.data.footballBalls.forEach(ball => visitor.visitFootballBall(ball));
    this.data.baseballBalls.forEach(ball => visitor.visitBaseballBall(ball));
  }
}

module.exports = BallsManagerClient;
