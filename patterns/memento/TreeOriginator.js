"use strict";

class TreeOriginator {
  constructor() {
    this.height = 0;
    this.width = 0;
  }

  createMemento() {
    const TreeMemento = require("./TreeMemento"); //avoid cyclic dependency
    return new TreeMemento(this);
  }

  setMemento(memento) {
    memento.restoreState(this);
  }
}

module.exports = TreeOriginator;
