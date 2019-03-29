"use strict";

/**
 * @module iterator/BaseItemsStorage
 * @requires iterator/BaseIterator
*/

/**
 * @classdesc Abstract class for all data storages. Provides interface for 
 * client side code.
 * @abstract
 * @throws {Error} Will throw an error if client code perform instantiation.
 */
class BaseItemsStorage {
  /**
   * Instances of BaseItemsStorage must not be created. This class is only for
   * inheritance.
   */
  constructor() {
    if (new.target === BaseItemsStorage)
      throw new Error("Can't instantiate abstract type.");
  }

  /**
   * Factory method for creating concrete instance of the iterator.
   * @return {module:iterator/BaseIterator~BaseIterator} Object 
   * for iteration on the client side code.
   * The object must be an instance of the BaseIterator class.
   * @throws {Error} Will throw an error if not overriden.
   */
  createIterator() {
    throw new Error("Not implemented.");
  }
}

module.exports = BaseItemsStorage;
