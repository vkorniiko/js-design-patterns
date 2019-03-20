const { DB1Implementor, DB2Implementor, ORMDescriptor, ORMDebugDescriptor } = require('../patterns/bridge/bridge');

QUnit.test("DB1Implementor.prototype.select(tableName)", function (assert) {
	const implementor = new DB1Implementor();
	const tableName = "testTable";

	const result = implementor.select(tableName);

	assert.ok(result instanceof Promise);
});

QUnit.test("DB2Implementor.prototype.select(tableName)", function (assert) {
	const implementor = new DB2Implementor();
	const tableName = "testTable";

	const result = implementor.select(tableName);

	assert.ok(result instanceof Promise);
});

QUnit.test("DB1Implementor.prototype.update(tableName, clones)", function (assert) {
	const implementor = new DB1Implementor();
	const tableName = "testTable";
	const clones = [];

	const result = implementor.update(tableName, clones);

	assert.ok(result instanceof Promise);
});

QUnit.test("DB2Implementor.prototype.update(tableName, clones)", function (assert) {
	const implementor = new DB2Implementor();
	const tableName = "testTable";
	const clones = [];

	const result = implementor.update(tableName, clones);

	assert.ok(result instanceof Promise);
});

QUnit.test("DB1Implementor.prototype.delete(tableName, clones)", function (assert) {
	const implementor = new DB1Implementor();
	const tableName = "testTable";
	const clones = [];

	const result = implementor.delete(tableName, clones);

	assert.ok(result instanceof Promise);
});

QUnit.test("DB2Implementor.prototype.delete(tableName, clones)", function (assert) {
	const implementor = new DB2Implementor();
	const tableName = "testTable";
	const clones = [];

	const result = implementor.delete(tableName, clones);

	assert.ok(result instanceof Promise);
});

QUnit.test("DB1Implementor.prototype.insert(tableName, clones)", function (assert) {
	const implementor = new DB1Implementor();
	const tableName = "testTable";
	const clones = [];

	const result = implementor.insert(tableName, clones);

	assert.ok(result instanceof Promise);
});

QUnit.test("DB2Implementor.prototype.insert(tableName, clones)", function (assert) {
	const implementor = new DB2Implementor();
	const tableName = "testTable";
	const clones = [];

	const result = implementor.insert(tableName, clones);

	assert.ok(result instanceof Promise);
});

QUnit.test("ORMDescriptor(implementor)", function (assert) {
	const implementor = new DB2Implementor();

	const result = new ORMDescriptor(implementor);

	assert.strictEqual(result.implementor, implementor);
});

QUnit.test("ORMDebugDescriptor(implementor)", function (assert) {
	const implementor = new DB1Implementor();

	const result = new ORMDebugDescriptor(implementor);

	assert.strictEqual(result.implementor, implementor);
});

QUnit.test("ORMDescriptor.prototype.selectAll(tableName)", function (assert) {
	const implementor = new DB2Implementor();
	const descriptor = new ORMDescriptor(implementor);
	const tableName = "testTable";

	const result = descriptor.selectAll(tableName)

	assert.ok(result instanceof Promise);
});

QUnit.test("ORMDebugDescriptor.prototype.selectAll(tableName)", function (assert) {
	const implementor = new DB2Implementor();
	const descriptor = new ORMDebugDescriptor(implementor);
	const tableName = "testTable";

	const result = descriptor.selectAll(tableName)

	assert.ok(result instanceof Promise);
});

QUnit.test("ORMDescriptor.prototype.updateAll(tableName, items)", function (assert) {
	const implementor = new DB2Implementor();
	const descriptor = new ORMDescriptor(implementor);
	const tableName = "testTable";
	const items = [{}];

	const result = descriptor.updateAll(tableName, items)

	assert.ok(result instanceof Promise);
	assert.deepEqual(items, [{}]);
});

QUnit.test("ORMDescriptor.prototype.deleteAll(tableName, items)", function (assert) {
	const implementor = new DB2Implementor();
	const descriptor = new ORMDescriptor(implementor);
	const tableName = "testTable";
	const items = [{}];

	const result = descriptor.deleteAll(tableName, items)

	assert.ok(result instanceof Promise);
	assert.deepEqual(items, [{}]);
});

QUnit.test("ORMDescriptor.prototype.insertAll(tableName, items)", function (assert) {
	const implementor = new DB2Implementor();
	const descriptor = new ORMDescriptor(implementor);
	const tableName = "testTable";
	const items = [{}];

	const result = descriptor.insertAll(tableName, items)

	assert.ok(result instanceof Promise);
	assert.deepEqual(items, [{}]);
});

QUnit.test("ORMDebugDescriptor.prototype.updateAll(tableName, items)", function (assert) {
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

	const result = descriptor.updateAll(tableName, items)

	assert.ok(result instanceof Promise);
	assert.deepEqual(items, [{}]);
	assert.deepEqual(clones, ['{"_debug":true}']);
});

QUnit.test("ORMDebugDescriptor.prototype.deleteAll(tableName, items)", function (assert) {
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

	const result = descriptor.deleteAll(tableName, items)

	assert.ok(result instanceof Promise);
	assert.deepEqual(items, [{}]);
	assert.deepEqual(clones, ['{"_debug":true}']);
});

QUnit.test("ORMDebugDescriptor.prototype.insertAll(tableName, items)", function (assert) {
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

	const result = descriptor.insertAll(tableName, items)

	assert.ok(result instanceof Promise);
	assert.deepEqual(items, [{}]);
	assert.deepEqual(clones, ['{"_debug":true}']);
});