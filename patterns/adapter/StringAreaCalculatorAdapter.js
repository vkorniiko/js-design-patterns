"use strict";

const BaseCalculatorAdapter = require("./BaseCalculatorAdapter");

class StringAreaCalculatorAdapter extends BaseCalculatorAdapter {
  calculate(widthStr, heightStr) {
    const width = parseFloat(widthStr), height = parseFloat(heightStr);
    return this.areaCalculatorAdaptee.calculateArea(width, height);
  }
}

module.exports = StringAreaCalculatorAdapter;
