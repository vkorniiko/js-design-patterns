"use strict";

class BaseFurnitureProduct {
  constructor(cost) {
    if (new.target === BaseFurnitureProduct)
      throw new Error("Can't instantiate abstract type.");

    this.cost = cost;
    this.shipped = false;
  }
}

module.exports = BaseFurnitureProduct;
