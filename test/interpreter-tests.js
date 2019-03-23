"use strict";

const requireHelper = require("./_require_helper");
const testHelper = require("./_test_helper");
const { VariableExpression, ConstantExpression, AddExpression, 
  SubtractExpression, MultiplyExpression, BaseExpression, BaseOperationExpression,
  DivideExpression } = requireHelper("../patterns/interpreter/interpreter");

QUnit.test("Check abstract types", (assert) => {
  testHelper.checkAbstract(BaseExpression, assert);
  testHelper.checkAbstractMethods(BaseExpression,
    ["evaluate"], assert);

  testHelper.checkAbstract(BaseOperationExpression, assert);
});

QUnit.test("Check invalid arguments", (assert) => {
  testHelper.checkConstructorInvalidArguments(
    VariableExpression, ["name"],[], assert);

  testHelper.checkConstructorInvalidArguments(
    ConstantExpression, ["value"],[], assert);

  testHelper.checkConstructorInvalidArguments(
    AddExpression, ["expression1", "expression2"],
    [new ConstantExpression(0), new ConstantExpression(0)], assert);
});

QUnit.test("VariableExpression(name)", (assert) => {
  const name = "x";
  const result = new VariableExpression(name);

  assert.strictEqual(result.name, name);
});

QUnit.test("VariableExpression.evaluate(context)", (assert) => {
  const name = "x";
  const expression = new VariableExpression(name);
  const context = { x: 10 };

  const result = expression.evaluate(context);

  assert.strictEqual(expression.name, name);
  assert.strictEqual(result, 10);
});

QUnit.test("ConstantExpression(value)", (assert) => {
  const value = 10;
  const result = new ConstantExpression(value);

  assert.strictEqual(result.value, value);
});

QUnit.test("ConstantExpression.prototype.evaluate(context)", (assert) => {
  const value = 10;
  const expression = new ConstantExpression(value);
  const context = { };

  const result = expression.evaluate(context);

  assert.strictEqual(result, 10);
});

QUnit.test("AddExpression(operand1, operand2)", (assert) => {
  const operand1 = new ConstantExpression(2);
  const operand2 = new VariableExpression("x");
  const result = new AddExpression(operand1, operand2);
  assert.strictEqual(result.operand1, operand1);
  assert.strictEqual(result.operand2, operand2);
});

QUnit.test("AddExpression.prototype.evaluate(context)", (assert) => {
  const operand1 = new ConstantExpression(2);
  const operand2 = new VariableExpression("x");
  const expression = new AddExpression(operand1, operand2);
  const context = { x: 3 };

  const result = expression.evaluate(context);

  assert.strictEqual(expression.operand1, operand1);
  assert.strictEqual(expression.operand2, operand2);
  assert.strictEqual(result, 5);
});

QUnit.test("SubtractExpression(operand1, operand2)", (assert) => {
  const operand1 = new ConstantExpression(2);
  const operand2 = new VariableExpression("x");
  const result = new SubtractExpression(operand1, operand2);
  assert.strictEqual(result.operand1, operand1);
  assert.strictEqual(result.operand2, operand2);
});

QUnit.test("SubtractExpression.prototype.evaluate(context)", (assert) => {
  const operand1 = new ConstantExpression(2);
  const operand2 = new VariableExpression("x");
  const expression = new SubtractExpression(operand1, operand2);
  const context = { x: 3 };

  const result = expression.evaluate(context);

  assert.strictEqual(expression.operand1, operand1);
  assert.strictEqual(expression.operand2, operand2);
  assert.strictEqual(result, -1);
});

QUnit.test("MultiplyExpression(operand1, operand2)", (assert) => {
  const operand1 = new ConstantExpression(2);
  const operand2 = new VariableExpression("x");
  const result = new MultiplyExpression(operand1, operand2);
  assert.strictEqual(result.operand1, operand1);
  assert.strictEqual(result.operand2, operand2);
});

QUnit.test("MultiplyExpression.prototype.evaluate(context)", (assert) => {
  const operand1 = new ConstantExpression(2);
  const operand2 = new VariableExpression("x");
  const expression = new MultiplyExpression(operand1, operand2);
  const context = { x: 3 };

  const result = expression.evaluate(context);

  assert.strictEqual(expression.operand1, operand1);
  assert.strictEqual(expression.operand2, operand2);
  assert.strictEqual(result, 6);
});

QUnit.test("DivideExpression(operand1, operand2)", (assert) => {
  const operand1 = new ConstantExpression(2);
  const operand2 = new VariableExpression("x");
  const result = new DivideExpression(operand1, operand2);
  assert.strictEqual(result.operand1, operand1);
  assert.strictEqual(result.operand2, operand2);
});

QUnit.test("DivideExpression.prototype.evaluate(context)", (assert) => {
  const operand1 = new ConstantExpression(9);
  const operand2 = new VariableExpression("x");
  const expression = new DivideExpression(operand1, operand2);
  const context = { x: 3 };

  const result = expression.evaluate(context);

  assert.strictEqual(expression.operand1, operand1);
  assert.strictEqual(expression.operand2, operand2);
  assert.strictEqual(result, 3);
});


QUnit.test("BaseExpression.prototype.evaluate(context)", (assert) => {
  //(a+b)*(c-d)/10
  const addOperand1 = new VariableExpression("a");
  const addOperand2 = new VariableExpression("b");
  const addExpression = new AddExpression(addOperand1, addOperand2);
  const subOperand3 = new VariableExpression("c");
  const subOperand4 = new VariableExpression("d");
  const subtractExpression = new SubtractExpression(subOperand3, subOperand4);
  const multiplyExpression = new MultiplyExpression(addExpression, subtractExpression);
  const divOperand2 = new ConstantExpression(10);

  const divideExpression = new DivideExpression(multiplyExpression, divOperand2);
  const context = { 
    a: 4,
    b: 6,
    c: 7,
    d: 2 
  };

  const result = divideExpression.evaluate(context);

  assert.strictEqual(result, 5);
});

