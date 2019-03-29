"use strict";

/**
 * @module builder/ListNode
 */

/**
 * @classdesc Represents child data structure for two-way list.
 * @property {module:builder/ListNode~ListNode} previous Link to previous 
 * list node.
 * @property {*} data Value of the list node.
 * @property {module:builder/ListNode~ListNode} next Link to the next node.
 */
class ListNode {
  /**
   * Creates an instance of ListNode.
   * @param {*} data Value for the list node.
   * @memberof ListNode
   */
  constructor(data) {
    this.previous = null;
    this.data = data;
    this.next = null;
  }
}

module.exports = ListNode;
