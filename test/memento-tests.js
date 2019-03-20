const { TreeOriginator, TreeMemento, MementoCaretaker } = require('../patterns/memento/memento');

QUnit.test("TreeMemento(originator)", function (assert) {
	const treeOriginator = new TreeOriginator();
	
	const result = new TreeMemento(treeOriginator);
	
	assert.deepEqual(result.state, { width: 0, height: 0 });
});

QUnit.test("TreeMemento.prototype.restoreState(originator)", function (assert) {
	const treeOriginator = new TreeOriginator();
	const memento = new TreeMemento(treeOriginator);
	
	treeOriginator.width = 1;
	treeOriginator.height = 1;

	memento.restoreState(treeOriginator);

	assert.strictEqual(treeOriginator.width, 0);
	assert.strictEqual(treeOriginator.height, 0);
});

QUnit.test("TreeMemento.prototype.setState(originator)", function (assert) {
	const treeOriginator = new TreeOriginator();
	const memento = new TreeMemento(treeOriginator);
	
	treeOriginator.width = 1;
	treeOriginator.height = 1;

	memento.setState(treeOriginator);

	assert.strictEqual(memento.state.width, 1);
	assert.strictEqual(memento.state.height, 1);
});

QUnit.test("TreeOriginator()", function (assert) {
	const result = new TreeOriginator();

	assert.strictEqual(result.width, 0);
	assert.strictEqual(result.height, 0);
});

QUnit.test("TreeOriginator.prototype.createMemento()", function (assert) {
	const result = new TreeOriginator();

	const memento = result.createMemento();

	assert.ok(memento instanceof TreeMemento);
	assert.strictEqual(memento.state.width, 0);
	assert.strictEqual(memento.state.height, 0);
});

QUnit.test("TreeOriginator.prototype.setMemento()", function (assert) {
	const originator = new TreeOriginator();
	const memento = originator.createMemento();

	originator.width = 1;
	originator.height = 1;

	originator.setMemento(memento);

	assert.strictEqual(originator.width, 0);
	assert.strictEqual(originator.height, 0);
});

QUnit.test("MementoCaretaker()", function (assert) {
	const careTaker = new MementoCaretaker();

	assert.deepEqual(careTaker.history, []);
});

QUnit.test("MementoCaretaker.prototype.saveMemento(originator)", function (assert) {
	const careTaker = new MementoCaretaker();
	const originator = new TreeOriginator();

	careTaker.saveMemento(originator);

	assert.strictEqual(careTaker.history.length, 1);
	assert.ok(careTaker.history[0] instanceof TreeMemento);
	assert.strictEqual(careTaker.history[0].state.width, 0);
	assert.strictEqual(careTaker.history[0].state.height, 0);
});

QUnit.test("MementoCaretaker.prototype.restoreMemento(originator, revision)", function (assert) {
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

QUnit.test("MementoCaretaker.prototype.clear()", function (assert) {
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