"use strict";

/* eslint-disable no-unused-vars*/
class BaseBallVisitor {
  constructor() {
    if (new.target === BaseBallVisitor)
      throw new Error("Can't instantiate abstract type.");
  }

  visitFootballBall(baseBall) { /* eslint-disable-line no-unused-vars*/
    throw new Error("Not implemented.");
  }

  visitBaseballBall(baseBall) { /* eslint-disable-line no-unused-vars*/
    throw new Error("Not implemented.");
  }
}

module.exports = BaseBallVisitor;
