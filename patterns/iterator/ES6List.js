"use strict";

const List = require("./List");
const ES6ListIterator = require("./ES6ListIterator");

class ES6List extends List {
  createIterator() {
    return new ES6ListIterator(this);
  }
}

module.exports = ES6List;
