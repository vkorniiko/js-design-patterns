"use strict";

class BaseDataHandler {
  constructor(successor) {
    if (new.target === BaseDataHandler)
      throw new Error("Can't instantiate abstract type.");

    if (successor !== null && !(successor instanceof BaseDataHandler))
      throw new Error("Invalid argument 'successor'.");

    this.handler = successor;
  }
  process(data) {
    if (this.handler != null)
      this.handler.process(data);
  }
}

module.exports = BaseDataHandler;
