"use strict";

const requireHelper = require("./_require_helper");
const testHelper = require("./_test_helper");
const DB1Implementor = requireHelper("../patterns/bridge/DB1Implementor"), 
      DB2Implementor = requireHelper("../patterns/bridge/DB2Implementor"), 
      ORMDescriptor = requireHelper("../patterns/bridge/ORMDescriptor"),
      BaseDBImplementor = requireHelper("../patterns/bridge/BaseDBImplementor"), 
      BaseORMDescriptor = requireHelper("../patterns/bridge/BaseORMDescriptor"),
      ORMDebugDescriptor = requireHelper("../patterns/bridge/ORMDebugDescriptor");
  
QUnit.test("Check abstract types", (assert) => {
  testHelper.checkAbstract(BaseDBImplementor, assert);
  testHelper.checkAbstractMethods(BaseDBImplementor,
    ["select", "update", "delete", "insert"], assert);

  testHelper.checkAbstract(BaseORMDescriptor, assert);
  testHelper.checkAbstractMethods(BaseORMDescriptor,
    ["selectAll", "updateAll", "deleteAll", "insertAll"], assert);
});

QUnit.test("Check invalid arguments", (assert) => {
  testHelper.checkConstructorInvalidArguments(
    ORMDescriptor, ["implementor"], [], assert);
});

QUnit.test("DB1Implementor.prototype.select(tableName)", (assert) => {
  const implementor = new DB1Implementor();
  const tableName = "testTable";

  const result = implementor.select(tableName);

  assert.ok(result instanceof Promise);
});

QUnit.test("DB2Implementor.prototype.select(tableName)", (assert) => {
  const implementor = new DB2Implementor();
  const tableName = "testTable";

  const result = implementor.select(tableName);

  assert.ok(result instanceof Promise);
});

QUnit.test("DB1Implementor.prototype.update(tableName, clones)", (assert) => {
  const implementor = new DB1Implementor();
  const tableName = "testTable";
  const clones = [];

  const result = implementor.update(tableName, clones);

  assert.ok(result instanceof Promise);
});

QUnit.test("DB2Implementor.prototype.update(tableName, clones)", (assert) => {
  const implementor = new DB2Implementor();
  const tableName = "testTable";
  const clones = [];

  const result = implementor.update(tableName, clones);

  assert.ok(result instanceof Promise);
});

QUnit.test("DB1Implementor.prototype.delete(tableName, clones)", (assert) => {
  const implementor = new DB1Implementor();
  const tableName = "testTable";
  const clones = [];

  const result = implementor.delete(tableName, clones);

  assert.ok(result instanceof Promise);
});

QUnit.test("DB2Implementor.prototype.delete(tableName, clones)", (assert) => {
  const implementor = new DB2Implementor();
  const tableName = "testTable";
  const clones = [];

  const result = implementor.delete(tableName, clones);

  assert.ok(result instanceof Promise);
});

QUnit.test("DB1Implementor.prototype.insert(tableName, clones)", (assert) => {
  const implementor = new DB1Implementor();
  const tableName = "testTable";
  const clones = [];

  const result = implementor.insert(tableName, clones);

  assert.ok(result instanceof Promise);
});

QUnit.test("DB2Implementor.prototype.insert(tableName, clones)", (assert) => {
  const implementor = new DB2Implementor();
  const tableName = "testTable";
  const clones = [];

  const result = implementor.insert(tableName, clones);

  assert.ok(result instanceof Promise);
});

QUnit.test("ORMDescriptor(implementor)", (assert) => {
  const implementor = new DB2Implementor();

  const result = new ORMDescriptor(implementor);

  assert.strictEqual(result.implementor, implementor);
});

QUnit.test("ORMDebugDescriptor(implementor)", (assert) => {
  const implementor = new DB1Implementor();

  const result = new ORMDebugDescriptor(implementor);

  assert.strictEqual(result.implementor, implementor);
});

QUnit.test("ORMDescriptor.prototype.selectAll(tableName)", (assert) => {
  const implementor = new DB2Implementor();
  const descriptor = new ORMDescriptor(implementor);
  const tableName = "testTable";

  const result = descriptor.selectAll(tableName);

  assert.ok(result instanceof Promise);
});

QUnit.test("ORMDebugDescriptor.prototype.selectAll(tableName)", (assert) => {
  const implementor = new DB2Implementor();
  const descriptor = new ORMDebugDescriptor(implementor);
  const tableName = "testTable";

  const result = descriptor.selectAll(tableName);

  assert.ok(result instanceof Promise);
});

QUnit.test("ORMDescriptor.prototype.updateAll(tableName, items)", (assert) => {
  const implementor = new DB2Implementor();
  const descriptor = new ORMDescriptor(implementor);
  const tableName = "testTable";
  const items = [{}];

  const result = descriptor.updateAll(tableName, items);

  assert.ok(result instanceof Promise);
  assert.deepEqual(items, [{}]);
});

QUnit.test("ORMDescriptor.prototype.deleteAll(tableName, items)", (assert) => {
  const implementor = new DB2Implementor();
  const descriptor = new ORMDescriptor(implementor);
  const tableName = "testTable";
  const items = [{}];

  const result = descriptor.deleteAll(tableName, items);

  assert.ok(result instanceof Promise);
  assert.deepEqual(items, [{}]);
});

QUnit.test("ORMDescriptor.prototype.insertAll(tableName, items)", (assert) => {
  const implementor = new DB2Implementor();
  const descriptor = new ORMDescriptor(implementor);
  const tableName = "testTable";
  const items = [{}];

  const result = descriptor.insertAll(tableName, items);

  assert.ok(result instanceof Promise);
  assert.deepEqual(items, [{}]);
});

QUnit.test("ORMDebugDescriptor.prototype.updateAll(tableName, items)", (assert) => {
  const implementor = new DB2Implementor();
  const descriptor = new ORMDebugDescriptor(implementor);
  const tableName = "testTable";
  const items = [{}];

  const itemToDebugOrig = descriptor.itemToDebugJSON.bind(descriptor);
  const clones = [];
  descriptor.itemToDebugJSON = (item) => {
    const clone = itemToDebugOrig(item);
    clones.push(clone);
  };

  const result = descriptor.updateAll(tableName, items);

  assert.ok(result instanceof Promise);
  assert.deepEqual(items, [{}]);
  assert.deepEqual(clones, ["{\"_debug\":true}"]);
});

QUnit.test("ORMDebugDescriptor.prototype.deleteAll(tableName, items)", (assert) => {
  const implementor = new DB2Implementor();
  const descriptor = new ORMDebugDescriptor(implementor);
  const tableName = "testTable";
  const items = [{}];

  const itemToDebugOrig = descriptor.itemToDebugJSON.bind(descriptor);
  const clones = [];
  descriptor.itemToDebugJSON = (item) => {
    const clone = itemToDebugOrig(item);
    clones.push(clone);
  };

  const result = descriptor.deleteAll(tableName, items);

  assert.ok(result instanceof Promise);
  assert.deepEqual(items, [{}]);
  assert.deepEqual(clones, ["{\"_debug\":true}"]);
});

QUnit.test("ORMDebugDescriptor.prototype.insertAll(tableName, items)", (assert) => {
  const implementor = new DB2Implementor();
  const descriptor = new ORMDebugDescriptor(implementor);
  const tableName = "testTable";
  const items = [{}];

  const itemToDebugOrig = descriptor.itemToDebugJSON.bind(descriptor);
  const clones = [];
  descriptor.itemToDebugJSON = (item) => {
    const clone = itemToDebugOrig(item);
    clones.push(clone);
  };

  const result = descriptor.insertAll(tableName, items);

  assert.ok(result instanceof Promise);
  assert.deepEqual(items, [{}]);
  assert.deepEqual(clones, ["{\"_debug\":true}"]);
});
