"use strict";


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


module.exports = BaseDBImplementor;
