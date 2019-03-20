const { ArrayDirector, ListBuilder, ListNode, List } = require('../patterns/builder/builder');

QUnit.test("List()", function (assert) {
	const result = new List();

	assert.strictEqual(result.firstChild, null);
});

QUnit.test("ListNode()", function (assert) {
	const data = 100;

	const result = new ListNode(data);

	assert.strictEqual(result.previous, null);
	assert.strictEqual(result.data, data);
	assert.strictEqual(result.next, null);
});

QUnit.test("ArrayDirector(data, baseBuilder)", function (assert) {
	const data = [1,2,3];
	const baseBuilder = new ListBuilder();

	const result = new ArrayDirector(data, baseBuilder);

	assert.strictEqual(result.builder, baseBuilder);
	assert.strictEqual(result.data, data);
});

QUnit.test("ListBuilder()", function (assert) {
	const result = new ListBuilder();

	assert.ok(result.firstListNode instanceof ListNode);
	assert.strictEqual(result.firstListNode, result.currentListNode);
});

QUnit.test("ListBuilder.prototype.buildNode(data)", function (assert) {
	const builder = new ListBuilder();
	const data = 1;

	builder.buildNode(data);

	assert.ok(builder.firstListNode instanceof ListNode);
	assert.ok(builder.firstListNode.next instanceof ListNode);
	assert.strictEqual(builder.firstListNode.next.data, data);
	assert.strictEqual(builder.firstListNode.next.previous, builder.firstListNode);
	assert.strictEqual(builder.firstListNode.next.next, null);
});

QUnit.test("ListBuilder.prototype.getResult()", function (assert) {
	const builder = new ListBuilder();

	const result = builder.getResult();

	assert.ok(result instanceof List);
	assert.strictEqual(result.firstChild, null);
	assert.strictEqual(result.lastChild, null);
});

QUnit.test("ListBuilder.prototype.createList()", function (assert) {
	const builder = new ListBuilder();

	const result = builder.createList();

	assert.ok(result instanceof List);
});


QUnit.test("ArrayDirector.prototype.construct()", function (assert) {
	const data = [1,2,3];
	const listBuilder = new ListBuilder();
	const director = new ArrayDirector(data, listBuilder);

	director.construct();

	const result = listBuilder.getResult();
	assert.ok(result instanceof List);
	assert.ok(result.firstChild instanceof ListNode);
	assert.ok(result.firstChild.next instanceof ListNode);
	assert.ok(result.firstChild.next.next instanceof ListNode);	
	
	assert.strictEqual(result.firstChild.next.previous, result.firstChild);
	assert.strictEqual(result.firstChild.next.next.previous, result.firstChild.next);
	assert.strictEqual(result.firstChild.next.next, result.lastChild);

	assert.strictEqual(result.firstChild.next.next.next, null);

	assert.strictEqual(result.firstChild.data, 1);
	assert.strictEqual(result.firstChild.next.data, 2);
	assert.strictEqual(result.firstChild.next.next.data, 3);
});