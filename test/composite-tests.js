const { NumberOperandLeaf, BinaryOperationComposite } = require('../patterns/composite/composite');

QUnit.test("NumberOperandLeaf(parent, value)", function (assert) {
	const parent = null;
	const value = 2;
	const result = new NumberOperandLeaf(value);
	
	assert.strictEqual(result.parent, parent);
	assert.strictEqual(result.value, value);
});

QUnit.test("NumberOperandLeaf.prototype.toString()", function (assert) {
	const parent = null;
	const value = 2;
	const leaf = new NumberOperandLeaf(value);

	const result = leaf.toString();
	
	assert.strictEqual(leaf.parent, parent);
	assert.strictEqual(leaf.value, value);
	assert.strictEqual(result, "2");
});

QUnit.test("NumberOperandLeaf.prototype.add()", function (assert) {
	const value = 2;
	const leaf = new NumberOperandLeaf(value);

	try {
		leaf.add();
		assert.ok(false);
	} catch(exp){
		assert.ok(true);
	}
});

QUnit.test("NumberOperandLeaf.prototype.remove()", function (assert) {
	const value = 2;
	const leaf = new NumberOperandLeaf(value);

	try {
		leaf.remove();
		assert.ok(false);
	} catch(exp){
		assert.ok(true);
	}
});

QUnit.test("NumberOperandLeaf.prototype.getChild(idx)", function (assert) {
	const value = 2;
	const leaf = new NumberOperandLeaf(value);

	try {
		leaf.getChild();
		assert.ok(false);
	} catch(exp){
		assert.ok(true);
	}
});

QUnit.test("BinaryOperationComposite(operationType)", function (assert) {
	const parent = null;	
	const operationType = BinaryOperationComposite.operationTypes.add;
	const operationComposite = new BinaryOperationComposite(operationType);

	assert.strictEqual(operationComposite.operationType, operationType);
	assert.strictEqual(operationComposite.parent, parent);
	assert.strictEqual(operationComposite.children.length, 0);
});

QUnit.test("BinaryOperationComposite.prototype.add()", function (assert) {
	const parent = null;
	const operationType = BinaryOperationComposite.operationTypes.add;
	const operationComposite = new BinaryOperationComposite(operationType);

	const leftOperand = new NumberOperandLeaf(2);
	const rightOperand = new NumberOperandLeaf(2);

	operationComposite.add(leftOperand);
	operationComposite.add(rightOperand);

	assert.strictEqual(operationComposite.operationType, operationType);
	assert.strictEqual(operationComposite.parent, parent);
	assert.strictEqual(operationComposite.children[0], leftOperand);
	assert.strictEqual(operationComposite.children[1], rightOperand);
	assert.strictEqual(operationComposite.children.length, 2);
	assert.strictEqual(leftOperand.parent, operationComposite);
	assert.strictEqual(rightOperand.parent, operationComposite);
});

QUnit.test("BinaryOperationComposite.prototype.remove()", function (assert) {
	const parent = null;
	const operationType = BinaryOperationComposite.operationTypes.add;
	const operationComposite = new BinaryOperationComposite(operationType);
	const leftOperand = new NumberOperandLeaf(2);

	operationComposite.add(leftOperand);
	operationComposite.remove(leftOperand);

	assert.strictEqual(operationComposite.operationType, operationType);
	assert.strictEqual(operationComposite.parent, parent);
	assert.strictEqual(operationComposite.children.length, 0);
	assert.strictEqual(leftOperand.parent, parent);
});

QUnit.test("BinaryOperationComposite.prototype.toString()", function (assert) {
	const parent = null;
	const operationType = BinaryOperationComposite.operationTypes.add;
	const operationComposite = new BinaryOperationComposite(operationType);
	const leftOperand = new NumberOperandLeaf(2);
	const rightOperand = new NumberOperandLeaf(2);

	operationComposite.add(leftOperand);
	operationComposite.add(rightOperand);
	
	const result = operationComposite.toString();

	assert.strictEqual(operationComposite.operationType, operationType);
	assert.strictEqual(operationComposite.parent, parent);
	assert.strictEqual(operationComposite.children.length, 2);
	assert.strictEqual(operationComposite.children[0], leftOperand);
	assert.strictEqual(operationComposite.children[1], rightOperand);
	assert.strictEqual(result, "2+2");
});

QUnit.test("BinaryOperationComposite.prototype.toString() multi", function (assert) {
	const operationComposite1 = new BinaryOperationComposite(BinaryOperationComposite.operationTypes.multiply);
	operationComposite1.add(new NumberOperandLeaf(2));
	operationComposite1.add(new NumberOperandLeaf(3));

	const operationComposite2 = new BinaryOperationComposite(BinaryOperationComposite.operationTypes.add);
	operationComposite2.add(operationComposite1);
	operationComposite2.add(new NumberOperandLeaf(4));
	
	const result = operationComposite2.toString();

	assert.strictEqual(result, "2*3+4");
});