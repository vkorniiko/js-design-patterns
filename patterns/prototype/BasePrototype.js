"use strict";

class BasePrototype {
  constructor() {
    if (new.target === BasePrototype)
      throw new Error("Can't instantiate abstract type.");
  }

  clone() {
    throw new Error("Not implemented.");
  }
}

module.exports = BasePrototype;
