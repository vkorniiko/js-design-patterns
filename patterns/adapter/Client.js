"use strict";

const BaseCalculatorAdapter = require("./BaseCalculatorAdapter");

class Client {
  calculate(calculator, width, height) {
    if (!(calculator instanceof BaseCalculatorAdapter))
      throw new Error("Invalid argument 'calculator'.");
    return calculator.calculate(width, height);
  }
}

module.exports = Client;
