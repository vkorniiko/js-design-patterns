"use strict";

class BaseSearchStrategy {
  constructor() {
    if (new.target === BaseSearchStrategy)
      throw new Error("Can't instantiate abstract type.");
  }

  search(array, number) { 
    throw new Error("Not implemented.");
  }
}

module.exports = BaseSearchStrategy;
