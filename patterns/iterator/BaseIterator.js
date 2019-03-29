"use strict";

/**
 * @module iterator/BaseIterator
*/

/**
 * @classdesc Abstract class of all iterators for data manipulation.
 * Provides interface for client side code.
 * @abstract
 * @throws {Error} Will throw an error if client code perform instantiation.
 */
class BaseIterator {
  /**
   * Instances of BaseIterator must not be created. This class is only for
   * inheritance.
   */
  constructor() {
    if (new.target === BaseIterator)
      throw new Error("Can't instantiate abstract type.");
  }

  /**
   * Returns the iterator to the initial state. 
   * @throws {Error} Will throw an error if not overriden.
   */
  reset() {
    throw new Error("Not implemented.");
  }

  /**
   * Changes the reference of current item of iterator to the next position.
   * @throws {Error} Will throw an error if not overriden.
   */
  moveNext() {
    throw new Error("Not implemented.");
  }

  /**
   * Checks completion of the data iteration.
   * @returns {Boolean} Returns true if iteration is complete,
   * otherwise false.
   * @throws {Error} Will throw an error if not overriden.
   */
  checkCompletion() {
    throw new Error("Not implemented.");
  }

  /**
   * Gets the current value of the iterator.
   * @returns {*} Returns current item of the iterator.
   * @throws {Error} Will throw an error if not overriden.
   */
  getCurrent() {
    throw new Error("Not implemented.");
  }
}

module.exports = BaseIterator;
