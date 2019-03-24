"use strict";

const BaseOperationExpression = require("./BaseOperationExpression");

class DivideExpression extends BaseOperationExpression {
  evaluate(context) {
    return this.operand1.evaluate(context) / this.operand2.evaluate(context);
  }
}

module.exports = DivideExpression;
