"use strict";

class BaseRocketState {
  constructor(fuelQuantity) {
    if (new.target === BaseRocketState)
      throw new Error("Can't instantiate abstract type.");

    this.fuelQuantity = fuelQuantity;
  }

  flyUp() {
    throw new Error("Not implemented.");
  }

  fly() {
    throw new Error("Not implemented.");
  }

  land() {
    throw new Error("Not implemented.");
  }
}

module.exports = BaseRocketState;
