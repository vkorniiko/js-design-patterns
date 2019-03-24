"use strict";

const BaseAnimalDecorator = require("./BaseAnimalDecorator");

class PigAnimalDecorator extends BaseAnimalDecorator {
  constructor(animalComponent) {
    super(animalComponent);
    this.grunted = false;
  }

  eat(count) {
    const result = super.eat(count);
    this.grunt();
    return result;
  }

  grunt() {
    this.grunted = true;
  }
}

module.exports = PigAnimalDecorator;
