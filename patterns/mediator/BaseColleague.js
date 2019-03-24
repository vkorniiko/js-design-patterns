"use strict";

const BaseMediator = require("./BaseMediator");

class BaseColleague {
  constructor(baseMediator) {
    if (new.target === BaseColleague)
      throw new Error("Can't instantiate abstract type.");

    if (!(baseMediator instanceof BaseMediator))
      throw new Error("Invalid argument 'baseMediator'.");

    this.mediator = baseMediator;
  }
}

module.exports = BaseColleague;
