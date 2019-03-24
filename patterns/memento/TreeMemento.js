"use strict";

const TreeOriginator = require("./TreeOriginator");

class TreeMemento {
  constructor(originator) {
    if (!(originator instanceof TreeOriginator))
      throw new Error("Invalid argument 'originator'.");

    this.state = {};
    this.setState(originator);
  }

  restoreState(originator) {
    if (!(originator instanceof TreeOriginator))
      throw new Error("Invalid argument 'originator'.");

    originator.width = this.state.width;
    originator.height = this.state.height;
  }

  setState(originator) {
    if (!(originator instanceof TreeOriginator))
      throw new Error("Invalid argument 'originator'.");

    this.state.width = originator.width;
    this.state.height = originator.height;
  }
}

module.exports = TreeMemento;
