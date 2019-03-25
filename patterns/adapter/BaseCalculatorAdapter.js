"use strict";

class BaseCalculatorAdapter {
  get area() {
    return this.areaCalculatorAdaptee.area;
  }

  constructor(areaCalculatorAdaptee) {
    if (new.target === BaseCalculatorAdapter)
      throw new Error("Can't instantiate abstract type.");
    this.areaCalculatorAdaptee = areaCalculatorAdaptee;
  }

  calculate(width, height) {
    throw new Error("Not implemented.");
  }
}

module.exports = BaseCalculatorAdapter;
