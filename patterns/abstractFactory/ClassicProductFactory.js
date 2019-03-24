"use strict";

const BaseProductFactory = require("./BaseProductFactory");
const ClassicPotato = require("./ClassicPotato");
const ClassicTomato = require("./ClassicTomato");

class ClassicProductFactory extends BaseProductFactory {
  createPotato() {
    const minWeight = 100, 
      weightRange = 100, 
      weight = minWeight + Math.floor(Math.random() * weightRange);

    return new ClassicPotato(weight);
  }
  createTomato() {
    const minWeight = 100, 
      weightRange = 200, 
      weight = minWeight + Math.floor(Math.random() * weightRange);

    return new ClassicTomato(weight);
  }
}

module.exports = ClassicProductFactory;
