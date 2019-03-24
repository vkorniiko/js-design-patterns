"use strict";

const BaseBall = require("./BaseBall");
const BaseBallVisitor = require("./BaseBallVisitor");
const states = { inflated: "inflated", deflated: "deflated" };

class FootballBall extends BaseBall {
  static get states() {
    return states;
  }

  constructor() {
    super();
    this.state = FootballBall.states.inflated;
    this.movingState = BaseBall.movingStates.lying;
  }

  accept(baseBallVisitor) {
    if (!(baseBallVisitor instanceof BaseBallVisitor))
      throw new Error("Invalid argument 'baseBallVisitor'.");

    baseBallVisitor.visitFootballBall(this);
  }
}

module.exports = FootballBall;
