"use strict";

class BaseExpressionComponent {
  constructor() {
    if (new.target === BaseExpressionComponent)
      throw new Error("Can't instantiate abstract type.");
    this.parent = null;
  }
  toString() {
    throw new Error("Not implemented.");
  }
  add() {
    throw new Error("Not implemented.");
  }
  remove() {
    throw new Error("Not implemented.");
  }
  getChild(idx) { 
    throw new Error("Not implemented.");
  }
}

module.exports = BaseExpressionComponent;
