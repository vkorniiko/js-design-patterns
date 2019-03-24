"use strict";

const BinarySearchStrategy = require("./BinarySearchStrategy");
const LinearSearchStrategy = require("./LinearSearchStrategy");
const arrayTypes = { sorted: "sorted", unsorted: "unsorted"};

class SearchContext {
  static get arrayTypes() {
    return arrayTypes;
  }

  constructor() {
    const str = this.strategies = new Map();
    str.set(SearchContext.arrayTypes.unsorted, new LinearSearchStrategy());
    str.set(SearchContext.arrayTypes.sorted, new BinarySearchStrategy());
  }

  search(array, number, arrayType) {
    const strategy = this.strategies.get(arrayType);
    return strategy.search(array, number);
  }
}

module.exports = SearchContext;
