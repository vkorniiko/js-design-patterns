"use strict";

const BaseExpressionComponent = require("./BaseExpressionComponent");

class BaseOperationComposite extends BaseExpressionComponent {
  constructor() {
    if (new.target === BaseOperationComposite)
      throw new Error("Can't instantiate abstract type.");

    super();
    this.children = [];
  }
  add(component) {
    component.parent = this;
    this.children.push(component);
  }
  remove(component) {
    if (this.children.length === 0)
      throw new Error("Invalid operation.");

    const idx = this.children.indexOf(component);

    if (idx === -1)
      throw new Error("Invalid operation.");

    component.parent = null;
    this.children.splice(idx, 1);
  }
  getChild(idx) {
    return this.children[idx];
  }
}

module.exports = BaseOperationComposite;
