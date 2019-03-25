"use strict";


class BaseBallVisitor {
  constructor() {
    if (new.target === BaseBallVisitor)
      throw new Error("Can't instantiate abstract type.");
  }

  visitFootballBall(baseBall) { 
    throw new Error("Not implemented.");
  }

  visitBaseballBall(baseBall) { 
    throw new Error("Not implemented.");
  }
}

module.exports = BaseBallVisitor;
