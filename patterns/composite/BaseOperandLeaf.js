"use strict";

const BaseExpressionComponent = require("./BaseExpressionComponent");

class BaseOperandLeaf extends BaseExpressionComponent {
  constructor(value) {
    if (new.target === BaseOperandLeaf)
      throw new Error("Can't instantiate abstract type.");
    super();
    this.value = value;
  }
}

module.exports = BaseOperandLeaf;
