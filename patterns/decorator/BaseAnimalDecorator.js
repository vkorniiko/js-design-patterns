"use strict";

const AnimalComponent = require("./AnimalComponent");

class BaseAnimalDecorator {
  constructor(animalComponent) {
    if (new.target === BaseAnimalDecorator)
      throw new Error("Can't instantiate abstract type.");

    if (!(animalComponent instanceof AnimalComponent))
      throw new Error("Invalid argument 'animalComponent'.");

    this.animalComponent = animalComponent;
  }

  eat(count) {
    return this.animalComponent.eat(count);
  }
}

module.exports = BaseAnimalDecorator;
