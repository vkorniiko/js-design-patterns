"use strict";

class AreaCalculatorAdaptee {
  constructor() {
    this.area = 0;
  }

  calculateArea(width, height) {
    return this.area = width * height;
  }
}

module.exports = AreaCalculatorAdaptee;
