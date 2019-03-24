"use strict";

const BaseProductFactory = require("./BaseProductFactory");

class FactoryClient {
  constructor(productFactory) {
    if (!(productFactory instanceof BaseProductFactory))
      throw new Error("Invalid argument 'productFactory'.");

    this.productFactory = productFactory;
  }
  getTomato() {
    return this.productFactory.createTomato();
  }
  getPotato() {
    return this.productFactory.createPotato();
  }
}

module.exports = FactoryClient;
