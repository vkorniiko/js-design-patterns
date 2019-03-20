const { CarSubject, VehicleProxy, HumanClient } = require('../patterns/proxy/proxy');

QUnit.test("CarSubject()", function (assert) {
	const result = new CarSubject();
	
	assert.strictEqual(result.distance, 0);
});

QUnit.test("CarSubject.prototype.move(distance)", function (assert) {
	const carSubject = new CarSubject();
	
	const result = carSubject.move(100);

	assert.strictEqual(result, 100);
	assert.strictEqual(carSubject.distance, 100);
});

QUnit.test("VehicleProxy(vehicleSubject, allowMoving)", function (assert) {
	const carSubject = new CarSubject();
	const result = new VehicleProxy(carSubject, true);
	
	assert.strictEqual(result.allowMoving, true);
	assert.strictEqual(result.vehicleSubject, carSubject);
});

QUnit.test("VehicleProxy.prototype.move(distance)", function (assert) {
	const carSubject = new CarSubject();
	const vehicleProxy = new VehicleProxy(carSubject, true);
	
	let result = vehicleProxy.move(100);

	assert.strictEqual(result, 100);
	assert.strictEqual(vehicleProxy.vehicleSubject.distance, 100);

	vehicleProxy.allowMoving = false;

	result = vehicleProxy.move(100);

	assert.strictEqual(result, 100);
	assert.strictEqual(vehicleProxy.vehicleSubject.distance, 100);
});

QUnit.test("HumanClient.prototype.move(veicheSubject, distance)", function (assert) {
	const carSubject = new CarSubject();
	const vehicleProxy = new VehicleProxy(carSubject, true);
	const client = new HumanClient();

	const result1 = client.move(vehicleProxy, 100);
	assert.strictEqual(result1, 100);

	vehicleProxy.allowMoving = false;
	const result2 = client.move(vehicleProxy, 100);
	assert.strictEqual(result2, 100);
});