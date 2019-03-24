"use strict";

class BaseMediator {
  constructor() {
    if (new.target === BaseMediator)
      throw new Error("Can't instantiate abstract type.");
  }

  notify(event, target) { /* eslint-disable-line no-unused-vars*/
    throw new Error("Not implemented.");
  }
}

module.exports = BaseMediator;
