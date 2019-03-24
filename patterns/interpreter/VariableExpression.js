"use strict";

const BaseExpression = require("./BaseExpression");

class VariableExpression extends BaseExpression {
  constructor(name) {
    if (({}).toString.call(name) !== "[object String]")
      throw new Error("Invalid argument 'name'.");

    super();
    this.name = name;
  }

  evaluate(context) {
    return context[this.name];
  }
}

module.exports = VariableExpression;
