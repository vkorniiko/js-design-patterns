"use strict";

const BaseSearchStrategy = require("./BaseSearchStrategy");

class LinearSearchStrategy extends BaseSearchStrategy {
  search(array, number) {
    let result = -1;
    for (let idx = 0; idx < array.length; ++idx) {
      if (array[idx] === number) {
        result = idx;
        break;
      }
    }
    return result;
  }
}

module.exports = LinearSearchStrategy;
