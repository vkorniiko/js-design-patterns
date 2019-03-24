"use strict";

const BaseFurnitureShop = require("./BaseFurnitureShop");
const Chair = require("./Chair");

class ChairShop extends BaseFurnitureShop {
  createFurniture() {
    const type = Chair.chairTypes.office, cost = 100;
    return new Chair(cost, type);
  }
}

module.exports = ChairShop;
