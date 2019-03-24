"use strict";

const BaseItemsStorage = require("./BaseItemsStorage");

class Client {
  constructor(baseItemsStorage) {
    if (!(baseItemsStorage instanceof BaseItemsStorage))
      throw new Error("Invalid argument 'baseItemsStorage'.");

    this.itemsStorage = baseItemsStorage;
  }
  iterate(callback) {
    const iterator = this.itemsStorage.createIterator();

    while (!iterator.checkCompletion()) {
      callback(iterator.getCurrent());
      iterator.moveNext();
    }
  }
}

module.exports = Client;
