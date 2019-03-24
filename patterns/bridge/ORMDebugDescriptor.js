"use strict";

const BaseORMDescriptor = require("./BaseORMDescriptor");

class ORMDebugDescriptor extends BaseORMDescriptor {
  constructor(implementor) {
    super(implementor);
  }

  itemToDebugJSON(item) {
    item._debug = true;
    const result = JSON.stringify(item);
    delete item._debug;
    return result;
  }

  selectAll(tableName) {
    return this.implementor.select(tableName);
  }

  updateAll(table, items) {
    const clones = items.map(item => this.itemToDebugJSON(item));
    return this.implementor.update(table, clones);
  }

  deleteAll(table, items) {
    const clones = items.map(item => this.itemToDebugJSON(item));
    return this.implementor.update(table, clones);
  }

  insertAll(table, items) {
    const clones = items.map(item => this.itemToDebugJSON(item));
    return this.implementor.update(table, clones);
  }
}

module.exports = ORMDebugDescriptor;
