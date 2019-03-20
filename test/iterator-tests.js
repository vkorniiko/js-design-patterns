const { List, ListIterator } = require('../patterns/iterator/iterator');
const { ListBuilder, ArrayDirector, ListNode } = require('../patterns/builder/builder');

class IteratorListBuilder extends ListBuilder {
	createList(){
		return new List();
	}
}

QUnit.test("List()", function (assert) {
	const result = new List();

	assert.strictEqual(result.firstChild, null);
	assert.strictEqual(result.lastChild, null);
});

QUnit.test("List.prototype.createIterator()", function (assert) {
	const list = new List();

	const result = list.createIterator();

	assert.ok(result instanceof ListIterator);
});

QUnit.test("ListIterator(list)", function (assert) {
	const array = [ 1, 2, 3 ];
	const listBuilder = new IteratorListBuilder();
	const arrayDirector = new ArrayDirector(array, listBuilder);
	arrayDirector.construct();
	
	const list = listBuilder.getResult();
	
	const result = new ListIterator(list);

	assert.ok(result.list instanceof List);
	assert.ok(result.current instanceof ListNode);
	assert.strictEqual(result.current.data, 1);
});

QUnit.test("ListIterator.prototype.moveNext()", function (assert) {
	const array = [ 1, 2, 3 ];
	const listBuilder = new IteratorListBuilder();
	const arrayDirector = new ArrayDirector(array, listBuilder);
	arrayDirector.construct();
	
	const list = listBuilder.getResult();
	
	const iterator = new ListIterator(list);

	iterator.moveNext();

	assert.ok(iterator.list instanceof List);
	assert.ok(iterator.current instanceof ListNode);
	assert.strictEqual(iterator.current.data, 2);
});

QUnit.test("ListIterator.prototype.checkCompletion()", function (assert) {
	const array = [ 1, 2, 3 ];
	const listBuilder = new IteratorListBuilder();
	const arrayDirector = new ArrayDirector(array, listBuilder);
	arrayDirector.construct();
	
	const list = listBuilder.getResult();
	
	const iterator = new ListIterator(list);

	let result = iterator.checkCompletion();

	assert.ok(iterator.list instanceof List);
	assert.ok(iterator.current instanceof ListNode);
	assert.strictEqual(iterator.current.data, 1);
	assert.strictEqual(result, false);

	iterator.moveNext();
	result = iterator.checkCompletion();

	assert.ok(iterator.list instanceof List);
	assert.ok(iterator.current instanceof ListNode);
	assert.strictEqual(iterator.current.data, 2);
	assert.strictEqual(result, false);

	iterator.moveNext();
	result = iterator.checkCompletion();

	assert.ok(iterator.list instanceof List);
	assert.ok(iterator.current instanceof ListNode);
	assert.strictEqual(iterator.current.data, 3);
	assert.strictEqual(result, true);
});

QUnit.test("ListIterator.prototype.getCurrent()", function (assert) {
	const array = [ 1, 2, 3 ];
	const listBuilder = new IteratorListBuilder();
	const arrayDirector = new ArrayDirector(array, listBuilder);
	arrayDirector.construct();
	
	const list = listBuilder.getResult();
	
	const iterator = new ListIterator(list);

	let result = iterator.getCurrent();

	assert.ok(iterator.list instanceof List);
	assert.ok(iterator.current instanceof ListNode);
	assert.strictEqual(iterator.current.data, 1);
	assert.strictEqual(result, 1);

	iterator.moveNext();
	result = iterator.getCurrent();

	assert.ok(iterator.list instanceof List);
	assert.ok(iterator.current instanceof ListNode);
	assert.strictEqual(iterator.current.data, 2);
	assert.strictEqual(result, 2);

	iterator.moveNext();
	result = iterator.getCurrent();

	assert.ok(iterator.list instanceof List);
	assert.ok(iterator.current instanceof ListNode);
	assert.strictEqual(iterator.current.data, 3);
	assert.strictEqual(result, 3);
});

QUnit.test("ListIterator.prototype.reset()", function (assert) {
	const array = [ 1, 2, 3 ];
	const listBuilder = new IteratorListBuilder();
	const arrayDirector = new ArrayDirector(array, listBuilder);
	arrayDirector.construct();
	
	const list = listBuilder.getResult();
	
	const iterator = new ListIterator(list);

	iterator.moveNext();
	iterator.reset();

	assert.ok(iterator.list instanceof List);
	assert.ok(iterator.current instanceof ListNode);
	assert.strictEqual(iterator.current.data, 1);
});

QUnit.test("ListIterator.prototype.moveNext() iterate", function (assert) {
	const array = [ 1, 2, 3 ];
	const listBuilder = new IteratorListBuilder();
	const arrayDirector = new ArrayDirector(array, listBuilder);
	arrayDirector.construct();
	
	const list = listBuilder.getResult();
	
	const iterator = new ListIterator(list);

	let idx = 0;

	while(!iterator.checkCompletion()){
		assert.strictEqual(iterator.getCurrent(), array[idx]);
		idx++;
		iterator.moveNext();
	}
});