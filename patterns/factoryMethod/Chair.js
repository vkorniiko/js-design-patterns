"use strict";

const BaseFurnitureProduct = require("./BaseFurnitureProduct");

const chairTypes = { office: "office", "home": "home" };

class Chair extends BaseFurnitureProduct {
  static get chairTypes() {
    return chairTypes;
  }

  constructor(cost, type) {
    super(cost);
    this.type = type;
  }
}

module.exports = Chair;
