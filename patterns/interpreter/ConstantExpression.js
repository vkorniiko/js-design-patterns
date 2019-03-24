"use strict";

const BaseExpression = require("./BaseExpression");

class ConstantExpression extends BaseExpression {
  constructor(value) {
    if (({}).toString.call(value) !== "[object Number]")
      throw new Error("Invalid argument 'value'.");
    super();
    this.value = value;
  }

  evaluate(context) { /* eslint-disable-line no-unused-vars*/
    return this.value;
  }
}

module.exports = ConstantExpression;
