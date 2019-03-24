"use strict";

const BaseProduct = require("./BaseProduct");

class BaseProductFactory {
  constructor() {
    if (new.target === BaseProductFactory)
      throw new Error("Can't instantiate abstract type.");
  }
  createPotato(baseProduct) {
    if (!(baseProduct instanceof BaseProduct))
      throw new Error("Invalid argument 'baseProduct'.");

    return baseProduct;
  }
  createTomato(baseProduct) {
    if (!(baseProduct instanceof BaseProduct))
      throw new Error("Invalid argument 'baseProduct'.");

    return baseProduct;
  }
}

module.exports = BaseProductFactory;
