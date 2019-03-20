const { RocketContext, RocketLandingState, RocketFlyingState, RocketFlyingUpState, RocketStandingState } = require('../patterns/state/state');

QUnit.test("RocketLandingState()", function (assert) {
	const result = new RocketLandingState();
	
	assert.strictEqual(result.fuelQuantity, "empty");
});

QUnit.test("RocketFlyingState()", function (assert) {
	const result = new RocketFlyingState();
	
	assert.strictEqual(result.fuelQuantity, "partiallyEmpty");
});

QUnit.test("RocketFlyingState.prototype.land(context)", function (assert) {
	const context = new RocketContext();
	const state = new RocketFlyingState();
	
	state.land(context);

	assert.ok(context.state instanceof RocketLandingState);
});

QUnit.test("RocketFlyingUpState()", function (assert) {
	const result = new RocketFlyingUpState();
	
	assert.strictEqual(result.fuelQuantity, "partiallyFull");
});

QUnit.test("RocketFlyingUpState.prototype.fly(context)", function (assert) {
	const context = new RocketContext();
	const state = new RocketFlyingUpState();
	
	state.fly(context);

	assert.ok(context.state instanceof RocketFlyingState);
});

QUnit.test("RocketStandingState()", function (assert) {
	const result = new RocketStandingState();
	
	assert.strictEqual(result.fuelQuantity, "full");
});

QUnit.test("RocketStandingState.prototype.flyUp(context)", function (assert) {
	const context = new RocketContext();
	const state = new RocketStandingState();
	
	state.flyUp(context);

	assert.ok(context.state instanceof RocketFlyingUpState);
});

QUnit.test("RocketContext()", function (assert) {
	const result = new RocketContext();
	
	assert.ok(result.state instanceof RocketStandingState);
	assert.strictEqual(result.getFuelQuantity(), "full");
});

QUnit.test("RocketContext.prototype.flyUp()", function (assert) {
	const context = new RocketContext();

	context.flyUp();

	assert.ok(context.state instanceof RocketFlyingUpState);
	assert.strictEqual(context.getFuelQuantity(), "partiallyFull");
});

QUnit.test("RocketContext.prototype.fly()", function (assert) {
	const context = new RocketContext();

	context.flyUp();
	context.fly();

	assert.ok(context.state instanceof RocketFlyingState);
	assert.strictEqual(context.getFuelQuantity(), "partiallyEmpty");
});

QUnit.test("RocketContext.prototype.land()", function (assert) {
	const context = new RocketContext();

	context.flyUp();
	context.fly();
	context.land();

	assert.ok(context.state instanceof RocketLandingState);
	assert.strictEqual(context.getFuelQuantity(), "empty");
});