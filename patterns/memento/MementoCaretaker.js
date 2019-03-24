"use strict";

const TreeOriginator = require("./TreeOriginator");

class MementoCaretaker {
  constructor() {
    this.history = [];
  }

  saveMemento(originator) {
    if (!(originator instanceof TreeOriginator))
      throw new Error("Invalid argument 'originator'.");

    const memento = originator.createMemento();
    this.history.push(memento);
  }

  restoreMemento(originator, revision) {
    if (!(originator instanceof TreeOriginator))
      throw new Error("Invalid argument 'originator'.");

    const memento = this.history[revision];
    originator.setMemento(memento);
  }

  clear() {
    this.history.length = 0;
  }
}

module.exports = MementoCaretaker;
