"use strict";

class BaseSearchStrategy {
  constructor(){
    if(new.target === BaseSearchStrategy)
      throw new Error("Can't instantiate abstract type.");
  }

  search(array, number){ //eslint-disable-line no-unused-vars
    throw new Error("Not implemented.");
  }
}

class LinearSearchStrategy extends BaseSearchStrategy {
  search(array, number){
    let result = -1;

    for(let idx = 0; idx < array.length; ++idx){
      if(array[idx] === number){
        result = idx;
        break;
      }
    }

    return result;
  }
}

class BinarySearchStrategy extends BaseSearchStrategy {
  search(array, number){
    let start = 0, end = array.length - 1, middle, arrayValue, result = -1;

    while (start <= end) {
      //eslint-disable-next-line no-magic-numbers
      middle = start + Math.floor((end - start) / 2);
      arrayValue = array[middle];

      if (number === arrayValue) {
        result = middle;
        break;
      }
      else if (number < arrayValue) 
        end = middle - 1;
      else 
        start = middle + 1;
    }

    return result;
  }
}

const arrayTypes = { sorted: "sorted", unsorted: "unsorted" };
class SearchContext {
  static get arrayTypes() {
    return arrayTypes;
  }

  constructor(){
    const strategies = this.strategies = new Map();
    strategies.set(SearchContext.arrayTypes.unsorted, 
      new LinearSearchStrategy());

    strategies.set(SearchContext.arrayTypes.sorted, 
      new BinarySearchStrategy());
  }

  search(array, number, arrayType){
    const strategy = this.strategies.get(arrayType);
    return strategy.search(array, number);
  }
}

module.exports = {
  BaseSearchStrategy,
  LinearSearchStrategy,
  BinarySearchStrategy,
  SearchContext
};
