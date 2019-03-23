"use strict";

const requireHelper = require("./_require_helper");
const testHelper = require("./_test_helper");
const { NumberOperandLeaf, BaseExpressionComponent, BaseOperandLeaf, BaseOperationComposite,
  BinaryOperationComposite } = requireHelper("../patterns/composite/composite");

QUnit.test("Check abstract types", (assert) => {
  testHelper.checkAbstract(BaseExpressionComponent, assert);
  testHelper.checkAbstractMethods(BaseExpressionComponent,
    ["toString", "add", "remove", "getChild"], assert);

  testHelper.checkAbstract(BaseOperandLeaf, assert);
  testHelper.checkAbstractMethods(BaseOperandLeaf,
    ["toString", "add", "remove", "getChild"], assert);

  testHelper.checkAbstract(BaseOperationComposite, assert);
  testHelper.checkAbstractMethods(BaseOperationComposite,
    ["toString"], assert);
});

QUnit.test("Check invalid arguments", (assert) => {
  testHelper.checkConstructorInvalidArguments(
    NumberOperandLeaf, ["value"], [], assert);
});

QUnit.test("NumberOperandLeaf(parent, value)", (assert) => {
  const parent = null;
  const value = 2;
  const result = new NumberOperandLeaf(value);

  assert.strictEqual(result.parent, parent);
  assert.strictEqual(result.value, value);
});

QUnit.test("NumberOperandLeaf.prototype.toString()", (assert) => {
  const parent = null;
  const value = 2;
  const leaf = new NumberOperandLeaf(value);

  const result = leaf.toString();

  assert.strictEqual(leaf.parent, parent);
  assert.strictEqual(leaf.value, value);
  assert.strictEqual(result, "2");
});

QUnit.test("NumberOperandLeaf.prototype.add()", (assert) => {
  const value = 2;
  const leaf = new NumberOperandLeaf(value);

  try {
    leaf.add();
    assert.ok(false);
  } catch(exp){
    assert.ok(true);
  }
});

QUnit.test("NumberOperandLeaf.prototype.remove()", (assert) => {
  const value = 2;
  const leaf = new NumberOperandLeaf(value);

  try {
    leaf.remove();
    assert.ok(false);
  } catch(exp){
    assert.ok(true);
  }
});

QUnit.test("NumberOperandLeaf.prototype.getChild(idx)", (assert) => {
  const value = 2;
  const leaf = new NumberOperandLeaf(value);

  try {
    leaf.getChild();
    assert.ok(false);
  } catch(exp){
    assert.ok(true);
  }
});

QUnit.test("BinaryOperationComposite(operationType)", (assert) => {
  const parent = null;
  const operationType = BinaryOperationComposite.operationTypes.add;
  const operationComposite = new BinaryOperationComposite(operationType);

  assert.strictEqual(operationComposite.operationType, operationType);
  assert.strictEqual(operationComposite.parent, parent);
  assert.strictEqual(operationComposite.children.length, 0);
});

QUnit.test("BinaryOperationComposite.prototype.add()", (assert) => {
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

QUnit.test("BinaryOperationComposite.prototype.add() fail", (assert) => {
  const op = new BinaryOperationComposite(BinaryOperationComposite.operationTypes.multiply);
  op.add(new NumberOperandLeaf(2));
  op.add(new NumberOperandLeaf(2));
  
  try {
    op.add(new NumberOperandLeaf(2));
    assert.notOk(true);
  } catch (err){
    assert.strictEqual(err.message, "Invalid operation.");
  }
});

QUnit.test("BinaryOperationComposite.prototype.remove()", (assert) => {
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

QUnit.test("BinaryOperationComposite.prototype.remove() fail", (assert) => {
  const op = new BinaryOperationComposite(BinaryOperationComposite.operationTypes.multiply);

  try {
    op.remove(new NumberOperandLeaf(2));
    assert.notOk(true);
  } catch (err){
    assert.strictEqual(err.message, "Invalid operation.");
  }
  
  op.add(new NumberOperandLeaf(3));

  try {
    op.remove(new NumberOperandLeaf(2));
    assert.notOk(true);
  } catch (err){
    assert.strictEqual(err.message, "Invalid operation.");
  }
});

QUnit.test("BinaryOperationComposite.prototype.toString()", (assert) => {
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

QUnit.test("BinaryOperationComposite.prototype.toString() fail", (assert) => {
  const op = new BinaryOperationComposite(BinaryOperationComposite.operationTypes.multiply);
  
  try {
    op.toString();
    assert.notOk(true);
  } catch (err){
    assert.strictEqual(err.message, "Invalid operation.");
  }

  op.add(new NumberOperandLeaf(2));

  try {
    op.toString();
    assert.notOk(true);
  } catch (err){
    assert.strictEqual(err.message, "Invalid operation.");
  }
});

QUnit.test("BinaryOperationComposite.prototype.toString() multi", (assert) => {
  const op1 = new BinaryOperationComposite(BinaryOperationComposite.operationTypes.multiply);
  op1.add(new NumberOperandLeaf(2));
  op1.add(new NumberOperandLeaf(3));

  const op2 = new BinaryOperationComposite(BinaryOperationComposite.operationTypes.add);
  op2.add(op1);
  op2.add(new NumberOperandLeaf(4));

  const result = op2.toString();

  assert.strictEqual(result, "2*3+4");
});
