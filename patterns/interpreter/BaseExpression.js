"use strict";

class BaseExpression {
  constructor() {
    if (new.target === BaseExpression)
      throw new Error("Can't instantiate abstract type.");
  }

  evaluate(context) { /* eslint-disable-line no-unused-vars*/
    throw new Error("Not implemented.");
  }
}

module.exports = BaseExpression;
