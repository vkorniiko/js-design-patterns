"use strict";
const movingStates = { lying: "lying", kickedOut: "kickedOut" };

class BaseBall {
  static get movingStates(){
    return movingStates;
  }

  constructor() {
    if (new.target === BaseBall)
      throw new Error("Can't instantiate abstract type.");

    this.height = 0;
    this.distance = 0;
  }

  accept(baseBallVisitor) { 
    throw new Error("Not implemented.");
  }
}

module.exports = BaseBall;
