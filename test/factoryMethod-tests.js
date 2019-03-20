const { Chair, ChairShop } = require('../patterns/factoryMethod/factoryMethod');

QUnit.test("Chair(cost, type)", function (assert) {
	const result = new Chair(100, Chair.chairTypes.office);
	
	assert.strictEqual(result.type, Chair.chairTypes.office);
	assert.strictEqual(result.cost, 100);
	assert.strictEqual(result.shipped, false);
});

QUnit.test("ChairShop.prototype.createFurniture()", function (assert) {
	const factory = new ChairShop();
	
	const result = factory.createFurniture();

	assert.ok(result instanceof Chair);
	assert.strictEqual(result.type, Chair.chairTypes.office);
	assert.strictEqual(result.cost, 100);
	assert.strictEqual(result.shipped, false);
});

QUnit.test("ChairShop.prototype.shipFurniture()", function (assert) {
	const factory = new ChairShop();
	
	const result = factory.shipFurniture();

	assert.ok(result instanceof Chair);
	assert.strictEqual(result.type, Chair.chairTypes.office);
	assert.strictEqual(result.cost, 100);
	assert.strictEqual(result.shipped, true);
});