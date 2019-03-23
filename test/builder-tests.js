"use strict";

const requireHelper = require("./_require_helper");
const testHelper = require("./_test_helper");
const { ArrayDirector, ListBuilder, ListNode, BaseBuilder, 
  List } = requireHelper("../patterns/builder/builder");

QUnit.test("Check abstract types", (assert) => {
  testHelper.checkAbstract(BaseBuilder, assert);
  testHelper.checkAbstractMethods(BaseBuilder,
    ["buildNode"], assert);
});

QUnit.test("Check invalid arguments", (assert) => {
  testHelper.checkConstructorInvalidArguments(
    ArrayDirector, ["baseBuilder"], [], assert);
});

QUnit.test("List()", (assert) => {
  const result = new List();

  assert.strictEqual(result.firstChild, null);
});

QUnit.test("ListNode()", (assert) => {
  const data = 100;

  const result = new ListNode(data);

  assert.strictEqual(result.previous, null);
  assert.strictEqual(result.data, data);
  assert.strictEqual(result.next, null);
});

QUnit.test("ArrayDirector(baseBuilder, data)", (assert) => {
  const data = [ 1, 2, 3 ];
  const baseBuilder = new ListBuilder();

  const result = new ArrayDirector(baseBuilder, data);

  assert.strictEqual(result.builder, baseBuilder);
  assert.strictEqual(result.data, data);
});

QUnit.test("ListBuilder()", (assert) => {
  const result = new ListBuilder();

  assert.ok(result.firstListNode instanceof ListNode);
  assert.strictEqual(result.firstListNode, result.currentListNode);
});

QUnit.test("ListBuilder.prototype.buildNode(data)", (assert) => {
  const builder = new ListBuilder();
  const data = 1;

  builder.buildNode(data);

  assert.ok(builder.firstListNode instanceof ListNode);
  assert.ok(builder.firstListNode.next instanceof ListNode);
  assert.strictEqual(builder.firstListNode.next.data, data);
  assert.strictEqual(builder.firstListNode.next.previous, builder.firstListNode);
  assert.strictEqual(builder.firstListNode.next.next, null);
});

QUnit.test("ListBuilder.prototype.getResult()", (assert) => {
  const builder = new ListBuilder();

  const result = builder.getResult();

  assert.ok(result instanceof List);
  assert.strictEqual(result.firstChild, null);
  assert.strictEqual(result.lastChild, null);
});

QUnit.test("ListBuilder.prototype.createList()", (assert) => {
  const builder = new ListBuilder();

  const result = builder.createList();

  assert.ok(result instanceof List);
});

QUnit.test("ArrayDirector.prototype.construct()", (assert) => {
  const data = [ 1, 2, 3 ];
  const listBuilder = new ListBuilder();
  const director = new ArrayDirector(listBuilder, data);

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
