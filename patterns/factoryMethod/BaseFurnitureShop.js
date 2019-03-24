"use strict";

class BaseFurnitureShop {
  constructor() {
    if (new.target === BaseFurnitureShop)
      throw new Error("Can't instantiate abstract type.");
  }

  createFurniture() {
    throw new Error("Not implemented.");
  }

  shipFurniture() {
    let furniture = this.createFurniture();
    furniture.shipped = true;
    return furniture;
  }
}

module.exports = BaseFurnitureShop;
