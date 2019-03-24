"use strict";

class AnimalComponent {
  constructor() {
    this.foodEaten = 0;
  }

  eat(count) {
    return this.foodEaten += count;
  }
}

module.exports = AnimalComponent;
