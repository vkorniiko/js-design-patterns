"use strict";

class ChainModel {
  constructor(pedals, wheels) {
    this.pedals = pedals;
    this.wheels = wheels;
    this.cycles = 0;
  }

  cycle(cycles) {
    const coef = 5;
    this.cycles += cycles;

    this.wheels.forEach(wheel => {
      wheel.rotate(cycles * coef);
    });

    return this.cycles;
  }
}

module.exports = ChainModel;
