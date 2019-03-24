"use strict";

const BaseProductFactory = require("./BaseProductFactory");
const GMOPotato = require("./GMOPotato");
const GMOTomato = require("./GMOTomato");

class GMOProductFactory extends BaseProductFactory {
  createPotato() {
    const weight = 200;
    return super.createPotato(new GMOPotato(weight));
  }
  createTomato() {
    const weight = 300;
    return super.createTomato(new GMOTomato(weight));
  }
}

module.exports = GMOProductFactory;
