"use strict";

const requireHelper = require("./_require_helper");
const testHelper = require("./_test_helper");
const TreeOriginator = requireHelper("../patterns/memento/TreeOriginator"),
      TreeMemento = requireHelper("../patterns/memento/TreeMemento"),
      MementoCaretaker = requireHelper("../patterns/memento/MementoCaretaker");

QUnit.test("Check invalid arguments", (assert) => {
  testHelper.checkConstructorInvalidArguments(
    TreeMemento, ["originator"], [], assert);

  testHelper.checkMethodInvalidArguments(
    TreeMemento, "restoreState", ["originator"], [], assert);

  testHelper.checkMethodInvalidArguments(
    MementoCaretaker, "saveMemento", ["originator"], [], assert);

  testHelper.checkMethodInvalidArguments(
    MementoCaretaker, "restoreMemento", ["originator"], [], assert);
});

QUnit.test("TreeMemento(originator)", (assert) => {
  const treeOriginator = new TreeOriginator();
  const result = new TreeMemento(treeOriginator);
  assert.deepEqual(result.state, { width: 0, height: 0 });
});

QUnit.test("TreeMemento.prototype.restoreState(originator)", (assert) => {
  const treeOriginator = new TreeOriginator();
  const memento = new TreeMemento(treeOriginator);
  treeOriginator.width = 1;
  treeOriginator.height = 1;

  memento.restoreState(treeOriginator);

  assert.strictEqual(treeOriginator.width, 0);
  assert.strictEqual(treeOriginator.height, 0);
});

QUnit.test("TreeMemento.prototype.setState(originator)", (assert) => {
  const treeOriginator = new TreeOriginator();
  const memento = new TreeMemento(treeOriginator);
  treeOriginator.width = 1;
  treeOriginator.height = 1;

  memento.setState(treeOriginator);

  assert.strictEqual(memento.state.width, 1);
  assert.strictEqual(memento.state.height, 1);
});

QUnit.test("TreeMemento.prototype.setState(originator) fail", (assert) => {
  const treeOriginator = new TreeOriginator();
  const memento = new TreeMemento(treeOriginator);

  try{
    memento.setState(null);
  } catch(err){
    assert.strictEqual(err.message, "Invalid argument 'originator'.");
  }
});

QUnit.test("TreeOriginator()", (assert) => {
  const result = new TreeOriginator();

  assert.strictEqual(result.width, 0);
  assert.strictEqual(result.height, 0);
});

QUnit.test("TreeOriginator.prototype.createMemento()", (assert) => {
  const result = new TreeOriginator();

  const memento = result.createMemento();

  assert.ok(memento instanceof TreeMemento);
  assert.strictEqual(memento.state.width, 0);
  assert.strictEqual(memento.state.height, 0);
});

QUnit.test("TreeOriginator.prototype.setMemento()", (assert) => {
  const originator = new TreeOriginator();
  const memento = originator.createMemento();

  originator.width = 1;
  originator.height = 1;

  originator.setMemento(memento);

  assert.strictEqual(originator.width, 0);
  assert.strictEqual(originator.height, 0);
});

QUnit.test("MementoCaretaker()", (assert) => {
  const careTaker = new MementoCaretaker();

  assert.deepEqual(careTaker.history, []);
});

QUnit.test("MementoCaretaker.prototype.saveMemento(originator)", (assert) => {
  const careTaker = new MementoCaretaker();
  const originator = new TreeOriginator();

  careTaker.saveMemento(originator);

  assert.strictEqual(careTaker.history.length, 1);
  assert.ok(careTaker.history[0] instanceof TreeMemento);
  assert.strictEqual(careTaker.history[0].state.width, 0);
  assert.strictEqual(careTaker.history[0].state.height, 0);
});

QUnit.test("MementoCaretaker.prototype.restoreMemento(originator, revision)", (assert) => {
  const careTaker = new MementoCaretaker();
  const originator = new TreeOriginator();

  careTaker.saveMemento(originator);

  originator.width = 1;
  originator.height = 1;

  careTaker.saveMemento(originator);

  originator.width = 2;
  originator.height = 2;

  careTaker.saveMemento(originator);

  careTaker.restoreMemento(originator, 1);

  assert.strictEqual(careTaker.history.length, 3);
  assert.strictEqual(originator.width, 1);
  assert.strictEqual(originator.height, 1);
});

QUnit.test("MementoCaretaker.prototype.clear()", (assert) => {
  const careTaker = new MementoCaretaker();
  const originator = new TreeOriginator();

  careTaker.saveMemento(originator);

  originator.width = 1;
  originator.height = 1;

  careTaker.saveMemento(originator);

  originator.width = 2;
  originator.height = 2;

  careTaker.saveMemento(originator);

  careTaker.clear();

  assert.strictEqual(careTaker.history.length, 0);
});
