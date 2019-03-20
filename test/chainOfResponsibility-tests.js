const { DeleteIdHandler, UpdateDateHandler, AppendGUIDHandler, DataWrapper, Client } = require('../patterns/chainOfResponsibility/chainOfResponsibility');

QUnit.test("DeleteIdHandler(successor)", function (assert) {
	const result = new DeleteIdHandler(null);
	
	assert.strictEqual(result.handler, null);
});

QUnit.test("DeleteIdHandler.prototype.process(successor)", function (assert) {
	const handler = new DeleteIdHandler(null);
	const date = new Date();
	const data = new DataWrapper(10, "payload", date);

	handler.process(data);

	assert.strictEqual(data.id, null);
	assert.strictEqual(data.guid, null);
	assert.strictEqual(data.date, date);
}); 

QUnit.test("UpdateDateHandler.prototype.process(successor)", function (assert) {
	const handler = new UpdateDateHandler(null);
	const date = new Date();
	const data = new DataWrapper(10, "payload", date);

	handler.process(data);

	assert.strictEqual(data.id, 10);
	assert.strictEqual(data.guid, null);
	assert.notStrictEqual(data.date, date);
	assert.ok(data.date instanceof Date);
}); 

QUnit.test("AppendGUIDHandler.prototype.process(successor)", function (assert) {
	const handler = new AppendGUIDHandler(null);
	const date = new Date();
	const data = new DataWrapper(10, "payload", date);
	
	handler.process(data);

	assert.strictEqual(data.id, 10);
	assert.strictEqual(({}).toString.call(data.guid), "[object String]");
	assert.strictEqual(data.date, date);
});

QUnit.test("AppendGUIDHandler.prototype.guid()", function (assert) {
	const handler = new AppendGUIDHandler(null);
	const guid = handler.guid();

	assert.ok({}.toString.call(guid), "[Object String]");
});

QUnit.test("Client()", function (assert) {
	const result = new Client();

	assert.ok(result.dataProcessChain instanceof DeleteIdHandler);
	assert.ok(result.dataProcessChain.handler instanceof UpdateDateHandler);
	assert.ok(result.dataProcessChain.handler.handler instanceof AppendGUIDHandler);
}); 

QUnit.test("Client.prototype.processData(data)", function (assert) {
	const client = new Client();
	const data = new DataWrapper();
	const date = new Date();

	client.processData(data);

	assert.strictEqual(data.id, null);
	assert.strictEqual(({}).toString.call(data.guid), "[object String]");
	assert.notStrictEqual(data.date, date);
	assert.ok(data.date instanceof Date);
}); 