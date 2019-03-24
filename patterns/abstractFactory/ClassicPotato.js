"use strict";

const BasePotato = require("./BasePotato");
const BaseProduct = require("./BaseProduct");

class ClassicPotato extends BasePotato {
  constructor(weight) {
    super(weight);
    this.shape = BaseProduct.shapeTypes.sphere;
  }
}

module.exports = ClassicPotato;
