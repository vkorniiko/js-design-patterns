"use strict";

const requireHelper = require("./_require_helper");
const testHelper = require("./_test_helper");
const { DeleteIdHandler, UpdateDateHandler, AppendGUIDHandler, DataWrapper, BaseDataHandler,
  Client } = requireHelper("../patterns/chainOfResponsibility/chainOfResponsibility");

QUnit.test("Check abstract types", (assert) => {
  testHelper.checkAbstract(BaseDataHandler, assert);
});

QUnit.test("Check invalid arguments", (assert) => {
  testHelper.checkConstructorInvalidArguments(
    DeleteIdHandler, ["successor"], [], assert);

  testHelper.checkConstructorInvalidArguments(
    UpdateDateHandler, ["successor"], [], assert);

  testHelper.checkConstructorInvalidArguments(
    AppendGUIDHandler, ["successor"], [], assert);
});

QUnit.test("DeleteIdHandler(successor)", (assert) => {
  const result = new DeleteIdHandler(null);

  assert.strictEqual(result.handler, null);
});

QUnit.test("DeleteIdHandler.prototype.process(successor)", (assert) => {
  const handler = new DeleteIdHandler(null);
  const date = new Date();
  const data = new DataWrapper(10, "payload", date);

  handler.process(data);

  assert.strictEqual(data.id, null);
  assert.strictEqual(data.guid, null);
  assert.strictEqual(data.date, date);
}); 

QUnit.test("UpdateDateHandler.prototype.process(successor)", (assert) => {
  const handler = new UpdateDateHandler(null);
  const date = new Date();
  const data = new DataWrapper(10, "payload", date);

  handler.process(data);

  assert.strictEqual(data.id, 10);
  assert.strictEqual(data.guid, null);
  assert.notStrictEqual(data.date, date);
  assert.ok(data.date instanceof Date);
}); 

QUnit.test("AppendGUIDHandler.prototype.process(successor)", (assert) => {
  const handler = new AppendGUIDHandler(null);
  const date = new Date();
  const data = new DataWrapper(10, "payload", date);

  handler.process(data);

  assert.strictEqual(data.id, 10);
  assert.strictEqual(({}).toString.call(data.guid), "[object String]");
  assert.strictEqual(data.date, date);
});

QUnit.test("AppendGUIDHandler.prototype.guid()", (assert) => {
  const handler = new AppendGUIDHandler(null);
  const guid = handler.guid();

  assert.ok({}.toString.call(guid), "[Object String]");
});

QUnit.test("Client()", (assert) => {
  const result = new Client();

  assert.ok(result.dataProcessChain instanceof DeleteIdHandler);
  assert.ok(result.dataProcessChain.handler instanceof UpdateDateHandler);
  assert.ok(result.dataProcessChain.handler.handler instanceof AppendGUIDHandler);
}); 

QUnit.test("Client.prototype.processData(data)", (assert) => {
  const client = new Client();
  const data = new DataWrapper();
  const date = new Date();

  client.processData(data);

  assert.strictEqual(data.id, null);
  assert.strictEqual(({}).toString.call(data.guid), "[object String]");
  assert.notStrictEqual(data.date, date);
  assert.ok(data.date instanceof Date);
});
