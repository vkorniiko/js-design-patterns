"use strict";

const BaseIterator = require("./BaseIterator");

class ListIterator extends BaseIterator {
  constructor(list) {
    super();
    this.list = list;
    this.current = list.firstChild;
  }
  reset() {
    this.current = this.list.firstChild;
  }
  moveNext() {
    this.current = this.current.next;
  }
  checkCompletion() {
    return this.current === null;
  }
  getCurrent() {
    return this.current === null ? null : this.current.data;
  }
}

module.exports = ListIterator;
