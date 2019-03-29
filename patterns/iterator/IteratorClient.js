"use strict";

/**
 * @module iterator/IteratorClient
 * @requires iterator/BaseItemsStorage
*/

const BaseItemsStorage = require("./BaseItemsStorage");

/**
 * Callback for each value of node in the list.
 * @callback module:iterator/IteratorClient.callback
 * @param {*} data Data of list node.
 */

/**
 * @classdesc Represents sample client for iteration of list data structure.
 * @example <caption>IteratorClient creation</caption>
 * const list = new List();
 * const client = new IteratorClient(list);
 */
class IteratorClient {
  /**
   * Creates an instance of IteratorClient.
   * @param {module:iterator/BaseItemsStorage~BaseItemsStorage} baseItemsStorage
   * List object for iteration.
   * @throws {Error} Will throw an error if baseItemsStorage is not instance of 
   * BaseItemsStorage.
   */
  constructor(baseItemsStorage) {
    if (!(baseItemsStorage instanceof BaseItemsStorage))
      throw new Error("Invalid argument 'baseItemsStorage'.");

    /**
    * @member {module:iterator/BaseItemsStorage~BaseItemsStorage}
    * @description List object for iteration.
    * @package
    */
    this.itemsStorage = baseItemsStorage;
  }

  /**
   * Performs iteration of the internal list object.
   * @param {module:iterator/IteratorClient.callback} callback 
   * Callback for each value of node in the list
   * @example <caption>Iteration sample</caption>
   * const list = new List();
   * 
   * const firstChild = list.firstChild = new ListNode(0);
   * const middleChild = new ListNode(1);
   * const lastChild = list.lastChild = new ListNode(2);
   * 
   * firstChild.next = middleChild;
   * middleChild.next = lastChild;
   * 
   * lastChild.previous = middleChild;
   * middleChild.previous = firstChild;
   * 
   * const client = new IteratorClient(list);
   * 
   * client.iterate(data => console.log(data));
   * 
   * //console output:
   * //0
   * //1
   * //2
   */
  iterate(callback) {
    const iterator = this.itemsStorage.createIterator();

    while (!iterator.checkCompletion()) {
      callback(iterator.getCurrent());
      iterator.moveNext();
    }
  }
}

module.exports = IteratorClient;
