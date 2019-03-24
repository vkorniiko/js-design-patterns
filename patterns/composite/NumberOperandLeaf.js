"use strict";

const BaseOperandLeaf = require("./BaseOperandLeaf");

class NumberOperandLeaf extends BaseOperandLeaf {
  constructor(value) {
    if (({}).toString.call(value) !== "[object Number]")
      throw new Error("Invalid argument 'value'.");
    super(value);
  }
  toString() {
    return this.value.toString();
  }
}

module.exports = NumberOperandLeaf;
