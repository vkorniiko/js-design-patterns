"use strict";

const shapeTypes = { "sphere": "sphere", cube: "cube" };

class BaseProduct {
  static get shapeTypes() {
    return shapeTypes;
  }
  constructor(weight) {
    if (new.target === BaseProduct)
      throw new Error("Can't instantiate abstract type.");

    this.weight = weight;
  }
}

module.exports = BaseProduct;
