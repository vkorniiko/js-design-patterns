"use strict";

class PedalModel {
  constructor(chain) {
    this.chain = chain;
    this.twirls = 0;
  }

  twirl(count) {
    const coef = 0.5;
    this.twirls += count;
    this.chain.cycle(count * coef);
    return this.twirls;
  }
}

module.exports = PedalModel;
