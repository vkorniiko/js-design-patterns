"use strict";

const requireHelper = require("./_require_helper");
const testHelper = require("./_test_helper");
const ListBuilder = requireHelper("../patterns/builder/ListBuilder"),
  ArrayDirector = requireHelper("../patterns/builder/ArrayDirector"), 
  ListNode = requireHelper("../patterns/builder/ListNode"),
  BaseItemsStorage = requireHelper("../patterns/iterator/BaseItemsStorage"),
  BaseIterator = requireHelper("../patterns/iterator/BaseIterator"),
  List = requireHelper("../patterns/iterator/List"),
  ES6List = requireHelper("../patterns/iterator/ES6List"),
  ListIterator = requireHelper("../patterns/iterator/ListIterator"),
  ES6ListIterator = requireHelper("../patterns/iterator/ES6ListIterator"),
  Client = requireHelper("../patterns/iterator/Client");

QUnit.test("Check abstract types", (assert) => {
  testHelper.checkAbstract(BaseItemsStorage, assert);
  testHelper.checkAbstractMethods(BaseItemsStorage,
    ["createIterator"], assert);

  testHelper.checkAbstract(BaseIterator, assert);
  testHelper.checkAbstractMethods(BaseIterator,
    ["reset", "moveNext", "checkCompletion", "getCurrent"], assert);
});

QUnit.test("Check invalid arguments", (assert) => {
  testHelper.checkConstructorInvalidArguments(
    Client, ["baseItemsStorage"],[], assert);
});
class IteratorListBuilder extends ListBuilder {
  createList(){
    return new List();
  }
}

class ES6IteratorListBuilder extends ListBuilder {
  createList(){
    return new ES6List();
  }
}

QUnit.test("List()", (assert) => {
  const result = new List();

  assert.strictEqual(result.firstChild, null);
  assert.strictEqual(result.lastChild, null);
});

QUnit.test("List.prototype.createIterator()", (assert) => {
  const list = new List();

  const result = list.createIterator();

  assert.ok(result instanceof ListIterator);
});

QUnit.test("ListIterator(list)", (assert) => {
  const array = [ 1, 2, 3 ];
  const listBuilder = new IteratorListBuilder();
  const arrayDirector = new ArrayDirector(listBuilder, array);
  arrayDirector.construct();
  const list = listBuilder.getResult();
  const result = new ListIterator(list);

  assert.ok(result.list instanceof List);
  assert.ok(result.current instanceof ListNode);
  assert.strictEqual(result.current.data, 1);
});

QUnit.test("ListIterator.prototype.moveNext()", (assert) => {
  const array = [ 1, 2, 3 ];
  const listBuilder = new IteratorListBuilder();
  const arrayDirector = new ArrayDirector(listBuilder, array);
  arrayDirector.construct();
  const list = listBuilder.getResult();
  const iterator = new ListIterator(list);

  iterator.moveNext();

  assert.ok(iterator.list instanceof List);
  assert.ok(iterator.current instanceof ListNode);
  assert.strictEqual(iterator.current.data, 2);
});

QUnit.test("ListIterator.prototype.checkCompletion()", (assert) => {
  const array = [ 1, 2, 3 ];
  const listBuilder = new IteratorListBuilder();
  const arrayDirector = new ArrayDirector(listBuilder, array);
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
  assert.strictEqual(result, false);

  iterator.moveNext();
  result = iterator.checkCompletion();

  assert.ok(iterator.list instanceof List);
  assert.strictEqual(iterator.current, null);
  assert.strictEqual(result, true);
});

QUnit.test("ListIterator.prototype.getCurrent()", (assert) => {
  const array = [ 1, 2, 3 ];
  const listBuilder = new IteratorListBuilder();
  const arrayDirector = new ArrayDirector(listBuilder, array);
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

QUnit.test("ListIterator.prototype.reset()", (assert) => {
  const array = [ 1, 2, 3 ];
  const listBuilder = new IteratorListBuilder();
  const arrayDirector = new ArrayDirector(listBuilder, array);
  arrayDirector.construct();
  const list = listBuilder.getResult();
  const iterator = new ListIterator(list);

  iterator.moveNext();
  iterator.reset();

  assert.ok(iterator.list instanceof List);
  assert.ok(iterator.current instanceof ListNode);
  assert.strictEqual(iterator.current.data, 1);
});

QUnit.test("ListIterator.prototype.moveNext() iterate", (assert) => {
  const array = [ 1, 2, 3 ];
  const listBuilder = new IteratorListBuilder();
  const arrayDirector = new ArrayDirector(listBuilder, array);
  arrayDirector.construct();
  const list = listBuilder.getResult();
  const iterator = new ListIterator(list);

  let idx = 0;

  while(!iterator.checkCompletion()){
    assert.strictEqual(iterator.getCurrent(), array[idx]);
    idx++;
    iterator.moveNext();
  }

  assert.strictEqual(idx, 3);
});

QUnit.test("ES6List.prototype.createIterator()", (assert) => {
  const list = new ES6List();

  const result = list.createIterator();

  assert.ok(result instanceof ES6ListIterator);
});

QUnit.test("ES6ListIterator.prototype.moveNext() for...of", (assert) => {
  const array = [ 1, 2, 3 ];
  const listBuilder = new ES6IteratorListBuilder();
  const arrayDirector = new ArrayDirector(listBuilder, array);
  arrayDirector.construct();
  const list = listBuilder.getResult();
  const iterator = new ES6ListIterator(list);
  let idx = 0;

  for(let item of iterator){
    assert.strictEqual(item, array[idx]);
    idx++;
  }
});

QUnit.test("Client(baseItemsStorage)", (assert) => {
  const baseItemsStorage = new List();
  const result = new Client(baseItemsStorage);

  assert.strictEqual(result.itemsStorage, baseItemsStorage);
});

QUnit.test("Client.prototype.iterate(callback)", (assert) => {
  const array = [ 1, 2, 3 ];
  const listBuilder = new IteratorListBuilder();
  const arrayDirector = new ArrayDirector(listBuilder, array);
  arrayDirector.construct();
  const list = listBuilder.getResult();
  const client = new Client(list);
  const items = []; 

  function callback(item){
    items.push(item);
  }

  client.iterate(callback);

  assert.strictEqual(client.itemsStorage, list);
  assert.deepEqual(array, items);
});
