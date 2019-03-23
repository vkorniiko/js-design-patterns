"use strict";

const requireHelper = require("./_require_helper");
const testHelper = require("./_test_helper");
const { RocketContext, RocketLandingState, RocketFlyingState, RocketFlyingUpState, 
  BaseRocketState, RocketStandingState } = requireHelper("../patterns/state/state");

QUnit.test("Check abstract types", (assert) => {
  testHelper.checkAbstract(BaseRocketState, assert);
  testHelper.checkAbstractMethods(BaseRocketState,
    ["flyUp", "fly", "land"], assert);
});

QUnit.test("RocketLandingState()", (assert) => {
  const result = new RocketLandingState();

  assert.strictEqual(result.fuelQuantity, "empty");
});

QUnit.test("RocketFlyingState()", (assert) => {
  const result = new RocketFlyingState();

  assert.strictEqual(result.fuelQuantity, "partiallyEmpty");
});

QUnit.test("RocketFlyingState.prototype.land(context)", (assert) => {
  const context = new RocketContext();
  const state = new RocketFlyingState();

  state.land(context);

  assert.ok(context.state instanceof RocketLandingState);
});

QUnit.test("RocketFlyingUpState()", (assert) => {
  const result = new RocketFlyingUpState();
  assert.strictEqual(result.fuelQuantity, "partiallyFull");
});

QUnit.test("RocketFlyingUpState.prototype.fly(context)", (assert) => {
  const context = new RocketContext();
  const state = new RocketFlyingUpState();
  state.fly(context);

  assert.ok(context.state instanceof RocketFlyingState);
});

QUnit.test("RocketStandingState()", (assert) => {
  const result = new RocketStandingState();
  assert.strictEqual(result.fuelQuantity, "full");
});

QUnit.test("RocketStandingState.prototype.flyUp(context)", (assert) => {
  const context = new RocketContext();
  const state = new RocketStandingState();
  state.flyUp(context);

  assert.ok(context.state instanceof RocketFlyingUpState);
});

QUnit.test("RocketContext()", (assert) => {
  const result = new RocketContext();
  assert.ok(result.state instanceof RocketStandingState);
  assert.strictEqual(result.getFuelQuantity(), "full");
});

QUnit.test("RocketContext.prototype.flyUp()", (assert) => {
  const context = new RocketContext();

  context.flyUp();

  assert.ok(context.state instanceof RocketFlyingUpState);
  assert.strictEqual(context.getFuelQuantity(), "partiallyFull");
});

QUnit.test("RocketContext.prototype.fly()", (assert) => {
  const context = new RocketContext();

  context.flyUp();
  context.fly();

  assert.ok(context.state instanceof RocketFlyingState);
  assert.strictEqual(context.getFuelQuantity(), "partiallyEmpty");
});

QUnit.test("RocketContext.prototype.land()", (assert) => {
  const context = new RocketContext();

  context.flyUp();
  context.fly();
  context.land();

  assert.ok(context.state instanceof RocketLandingState);
  assert.strictEqual(context.getFuelQuantity(), "empty");
});
