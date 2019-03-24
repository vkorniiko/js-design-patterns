"use strict";

const BaseItemsStorage = require("./BaseItemsStorage");
const ListIterator = require("./ListIterator");

class List extends BaseItemsStorage {
  constructor() {
    super();
    this.firstChild = null;
    this.lastChild = null;
  }
  createIterator() {
    return new ListIterator(this);
  }
}

module.exports = List;
