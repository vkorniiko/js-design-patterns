"use strict";

const BaseCalculatorAdapter = require("./BaseCalculatorAdapter");

class NumberAreaCalculatorAdapter extends BaseCalculatorAdapter {
  calculate(width, height) {
    return this.areaCalculatorAdaptee.calculateArea(width, height);
  }
}

module.exports = NumberAreaCalculatorAdapter;
