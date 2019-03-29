"use strict";

/**
 * @module iterator/List
 * @requires iterator/BaseItemsStorage
 * @requires iterator/ListIterator
*/

const BaseItemsStorage = require("./BaseItemsStorage");

/**
 * @classdesc List represents two-way list data structure. Basically list 
 * reminds chain with data in links. List stores references to the first and to 
 * the last child node. Each node has references to the previous and 
 * the next node.
 * @extends {module:iterator/BaseItemsStorage~BaseItemsStorage}
 * @example <caption>Manual list creation</caption>
 * //List with 3 nodes
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
 */
class List extends BaseItemsStorage {
  /**
   * Creates an instance of List.
   */
  constructor() {
    super();

    /**
    * @member {module:builder/ListNode~ListNode}
    * @description First node of list.
    * @package
    */
    this.firstChild = null;
    /**
    * @member {module:builder/ListNode~ListNode}
    * @description Last node of list.
    * @package
    */
    this.lastChild = null;
  }

  /**
   * Factory method for creating concrete instance of the iterator. Creates 
   * ListIterator which can iterate nodes of the current list object.
   * @return {module:iterator/ListIterator~ListIterator} Object 
   * for data iteration on the client side code.
   * @example <caption>Iterator creation of the current list</caption>
   * const list = new List();
   * const iterator = list.createIterator();
   * 
   * console.log(iterator instanceof ListIterator); //true
   */
  createIterator() {
    const ListIterator = require("./ListIterator");
    return new ListIterator(this);
  }
}

module.exports = List;
