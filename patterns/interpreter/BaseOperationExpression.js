"use strict";

const BaseExpression = require("./BaseExpression");

class BaseOperationExpression extends BaseExpression {
  constructor(expression1, expression2) {
    if (new.target === BaseOperationExpression)
      throw new Error("Can't instantiate abstract type.");

    if (!(expression1 instanceof BaseExpression))
      throw new Error("Invalid argument 'expression1'.");

    if (!(expression2 instanceof BaseExpression))
      throw new Error("Invalid argument 'expression2'.");

    super();
    this.operand1 = expression1;
    this.operand2 = expression2;
  }
}

module.exports = BaseOperationExpression;
