"use strict";

const BaseOperationComposite = require("./BaseOperationComposite");

const operationTypes = { add : "+", remove: "-", divide: "/", multiply: "*" };

class BinaryOperationComposite extends BaseOperationComposite {
  static get operationTypes() {
    return operationTypes;
  }
  constructor(operationType) {
    super();
    this.operationType = operationType;
  }
  add(component) {
    const maxChildren = 2;

    if (this.children.length >= maxChildren)
      throw new Error("Invalid operation.");

    super.add(component);
  }
  toString() {
    const leftOperand = this.getChild(0);

    if (leftOperand == null)
      throw new Error("Invalid operation.");

    const rightOperand = this.getChild(1);

    if (rightOperand == null)
      throw new Error("Invalid operation.");

    const operation = this.operationType;

    return `${leftOperand}${operation}${rightOperand}`;
  }
}

module.exports = BinaryOperationComposite;
