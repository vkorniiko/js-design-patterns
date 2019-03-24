"use strict";

const BaseTomato = require("./BaseTomato");
const BaseProduct = require("./BaseProduct");

class GMOTomato extends BaseTomato {
  constructor(weight) {
    super(weight);
    this.shape = BaseProduct.shapeTypes.cube;
    this.wings = 2;
  }
}

module.exports = GMOTomato;
