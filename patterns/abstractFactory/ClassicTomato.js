"use strict";

const BaseTomato = require("./BaseTomato");
const BaseProduct = require("./BaseProduct");

class ClassicTomato extends BaseTomato {
  constructor(weight) {
    super(weight);
    this.shape = BaseProduct.shapeTypes.sphere;
  }
}

module.exports = ClassicTomato;
