"use strict";

const BasePotato = require("./BasePotato");
const BaseProduct = require("./BaseProduct");

class GMOPotato extends BasePotato {
  constructor(weight) {
    super(weight);
    this.shape = BaseProduct.shapeTypes.cube;
    this.legs = 5;
  }
}

module.exports = GMOPotato;
