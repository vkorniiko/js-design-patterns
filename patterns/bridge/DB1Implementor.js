"use strict";
/* eslint-disable no-unused-vars*/
const BaseDBImplementor = require("./BaseDBImplementor");
//concrete query implementation for db1
class DB1Implementor extends BaseDBImplementor {
  select(tableName) { return new Promise(() => { }, () => { }); }
  update(tableName, clones) { return new Promise(() => { }, () => { }); }
  delete(tableName, clones) { return new Promise(() => { }, () => { }); }
  insert(tableName, clones) { return new Promise(() => { }, () => { }); }
}
/* eslint-enable no-unused-vars */

module.exports = DB1Implementor;
