"use strict";

const BaseBallVisitor = require("./BaseBallVisitor");
const BaseBall = require("./BaseBall");

class GetStatisticVisitor extends BaseBallVisitor {
  constructor() {
    super();
    this.totalDistance = 0;
    this.totalHeight = 0;
  }

  getStatistics(baseBall) {
    this.totalDistance += baseBall.distance;
    this.totalHeight += baseBall.height;
  }

  visitFootballBall(baseBall) {
    if (!(baseBall instanceof BaseBall))
      throw new Error("Invalid argument 'baseBall'.");

    this.getStatistics(baseBall);
  }

  visitBaseballBall(baseBall) {
    if (!(baseBall instanceof BaseBall))
      throw new Error("Invalid argument 'baseBall'.");

    this.getStatistics(baseBall);
  }
}

module.exports = GetStatisticVisitor;
