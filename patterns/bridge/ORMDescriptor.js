"use strict";

const BaseORMDescriptor = require("./BaseORMDescriptor");

class ORMDescriptor extends BaseORMDescriptor {
  constructor(implementor) {
    super(implementor);
  }

  selectAll(tableName) {
    return this.implementor.select(tableName);
  }

  updateAll(table, items) {
    const clones = items.map(item => JSON.stringify(item));
    return this.implementor.update(table, clones);
  }

  deleteAll(table, items) {
    const clones = items.map(item => JSON.stringify(item));
    return this.implementor.update(table, clones);
  }

  insertAll(table, items) {
    const clones = items.map(item => JSON.stringify(item));
    return this.implementor.update(table, clones);
  }
}

module.exports = ORMDescriptor;
