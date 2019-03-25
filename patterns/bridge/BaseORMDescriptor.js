"use strict";

const BaseDBImplementor = require("./BaseDBImplementor");


class BaseORMDescriptor {
  constructor(implementor) {
    if (new.target === BaseORMDescriptor)
      throw new Error("Can't instantiate abstract type.");

    if (!(implementor instanceof BaseDBImplementor))
      throw new Error("Invalid argument 'implementor'.");

    this.implementor = implementor;
  }
  selectAll() {
    throw new Error("Not implemented.");
  }
  updateAll(items) {
    throw new Error("Not implemented.");
  }
  deleteAll(items) {
    throw new Error("Not implemented.");
  }
  insertAll(items) {
    throw new Error("Not implemented.");
  }
}


module.exports = BaseORMDescriptor;
