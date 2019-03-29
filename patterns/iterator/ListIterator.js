"use strict";

/**
 * @module iterator/ListIterator
 * @requires iterator/BaseIterator
 * @requires iterator/List
*/

const BaseIterator = require("./BaseIterator");
const List = require("./List");

/**
 * Iterator for list data structure. 
 * Can iterate two-way list in forward direction.
 * @extends {module:iterator/BaseIterator~BaseIterator}
 * @throws {Error} Will throw an error if list is not instance of List.
 * @example <caption>ListIterator creation</caption>
 * const list = new List();
 * const iterator = new ListIterator(list);
 */
class ListIterator extends BaseIterator {
  /**
   * Creates an instance of ListIterator.
   * @param {module:iterator/List~List} list List object for iteration.
   */
  constructor(list) {
    super();

    if(!(list instanceof List))
      throw new Error("Invalid argument 'list'.");

    /**
    * @member {module:iterator/List~List}
    * @description List object for iteration.
    * @private
    */
    this.list = list;

    /**
    * @member {module:builder/ListNode~ListNode}
    * @description Current list node.
    * @private
    */
    this.current = list.firstChild;
  }

  /**
   * Resets the iterator to it initial state. Sets the current property to 
   * the first child of list.
   * @example <caption>Reseting the iterator</caption>
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
   * const iterator = new ListIterator(list);
   * iterator.getCurrent(); //0 - initial state
   * 
   * iterator.moveNext();
   * iterator.getCurrent(); //1
   * 
   * iterator.reset();
   * iterator.getCurrent(); //0
   */
  reset() {
    this.current = this.list.firstChild;
  }

  /**
   * Changes the reference of current item of iterator to the next position.
   * This means what current property will be store reference to the next 
   * list node.
   * @example <caption>Moving current item to next node</caption>
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
   * middleChild.previous = firstChild
   * 
   * const iterator = new ListIterator(list);
   * iterator.getCurrent(); //0
   * 
   * iterator.moveNext();
   * iterator.getCurrent(); //1
   */
  moveNext() {
    this.current = this.current.next;
  }

  /**
   * Checks completion of the data iteration.
   * @returns {Boolean} Returns true if iteration is complete,
   * otherwise false.
   * @example <caption>Checking completion</caption>
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
   * middleChild.previous = firstChild
   * 
   * const iterator = new ListIterator(list);
   * iterator.moveNext();
   * iterator.moveNext();
   * iterator.moveNext();
   * 
   * iterator.checkCompletion(); //true
   */
  checkCompletion() {
    return this.current === null;
  }

  /**
   * Gets the current value of the iterator.
   * @returns {*} Current value of the iterator.
   * @example <caption>Getting current item</caption>
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
   * middleChild.previous = firstChild
   * 
   * const iterator = new ListIterator(list);
   * iterator.getCurrent(); //0
   * 
   * iterator.moveNext();
   * iterator.getCurrent(); //1
   * 
   * iterator.moveNext();
   * iterator.getCurrent(); //2
   */
  getCurrent() {
    return this.current === null ? null : this.current.data;
  }
}

module.exports = ListIterator;
