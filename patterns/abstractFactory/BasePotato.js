"use strict";

const BaseProduct = require("./BaseProduct");

class BasePotato extends BaseProduct {
  constructor(weight) {
    if (new.target === BasePotato)
      throw new Error("Can't instantiate abstract type.");

    super(weight);
    this.rootCrop = true;
    this.vegetable = true;
  }
}

module.exports = BasePotato;
