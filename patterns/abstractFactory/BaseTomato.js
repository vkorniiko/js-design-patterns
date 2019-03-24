"use strict";

const BaseProduct = require("./BaseProduct");

class BaseTomato extends BaseProduct {
  constructor(weight) {
    if (new.target === BaseTomato)
      throw new Error("Can't instantiate abstract type.");

    super(weight);
    this.vegetable = true;
  }
}

module.exports = BaseTomato;
