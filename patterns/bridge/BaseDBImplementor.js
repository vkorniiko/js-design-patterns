"use strict";

/* eslint-disable no-unused-vars*/
class BaseDBImplementor {
  constructor() {
    if (new.target === BaseDBImplementor)
      throw new Error("Can't instantiate abstract type.");
  }
  select(tableName) {
    throw new Error("Not implemented.");
  }
  update(tableName, clones) {
    throw new Error("Not implemented.");
  }
  delete(tableName, clones) {
    throw new Error("Not implemented.");
  }
  insert(tableName, clones) {
    throw new Error("Not implemented.");
  }
}
/* eslint-enable no-unused-vars */

module.exports = BaseDBImplementor;
