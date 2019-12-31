"use strict";

const BallsCollectionData = require("./BallsCollectionData");

class BallsManagerClient {
  constructor() {
    this.data = new BallsCollectionData();
  }

  performDynamicActionOnAllBalls(visitor) {
    this.data.balls.forEach(ball => ball.accept(visitor));
  }
}

module.exports = BallsManagerClient;
