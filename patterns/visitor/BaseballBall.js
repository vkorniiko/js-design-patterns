"use strict";

const BaseBall = require("./BaseBall");
const BaseBallVisitor = require("./BaseBallVisitor");

class BaseballBall extends BaseBall {
  constructor() {
    super();
    this.movingState = BaseBall.movingStates.lying;
  }

  accept(baseBallVisitor) {
    if (!(baseBallVisitor instanceof BaseBallVisitor))
      throw new Error("Invalid argument 'baseBallVisitor'.");

    baseBallVisitor.visitBaseballBall(this);
  }
}

module.exports = BaseballBall;
