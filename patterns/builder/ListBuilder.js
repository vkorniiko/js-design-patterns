"use strict";

const BaseBuilder = require("./BaseBuilder");
const ListNode = require("./ListNode");
const List = require("./List");

class ListBuilder extends BaseBuilder {
  constructor() {
    super();
    this.firstListNode = new ListNode(null);
    this.currentListNode = this.firstListNode;
  }

  buildNode(data) {
    const previousListNode = this.currentListNode;
    previousListNode.next = new ListNode(data);
    this.currentListNode = previousListNode.next;
    this.currentListNode.previous = previousListNode;
  }

  createList() {
    return new List();
  }

  getResult() {
    const list = this.createList();
    list.firstChild = this.firstListNode.next;

    if (list.firstChild instanceof ListNode) {
      list.firstChild.previous = null;
      list.lastChild = this.currentListNode;
    }

    return list;
  }
}

module.exports = ListBuilder;
