"use strict";

class BaseItemsStorage {
  constructor() {
    if (new.target === BaseItemsStorage)
      throw new Error("Can't instantiate abstract type.");
  }
  createIterator() {
    throw new Error("Not implemented.");
  }
}

module.exports = BaseItemsStorage;
