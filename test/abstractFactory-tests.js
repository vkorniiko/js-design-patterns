const { FactoryClient, GMOProductFactory, ClassicProductFactory, GMOPotato, GMOTomato, ClassicPotato, ClassicTomato, BaseProduct, BasePotato, BaseTomato } = require('../patterns/abstractFactory/abstractFactory');

QUnit.test("GMOPotato()", function (assert) {
	const result = new GMOPotato(100);
	
	assert.ok(result instanceof GMOPotato);
	assert.ok(result.rootCrop);
	assert.ok(result.vegetable);
	assert.strictEqual(result.shape, "cube");
	assert.strictEqual(result.weight, 100);
	assert.strictEqual(result.legs, 5);
});

QUnit.test("GMOTomato()", function (assert) {
	const result = new GMOTomato(100);
	
	assert.ok(result instanceof GMOTomato);
	assert.ok(result.vegetable);
	assert.strictEqual(result.shape, "cube");
	assert.strictEqual(result.weight, 100);
	assert.strictEqual(result.wings, 2);
});

QUnit.test("GMOProductFactory.prototype.createPotato()", function (assert) {
	const factory = new GMOProductFactory();
	
	const result = factory.createPotato();

	assert.ok(result instanceof GMOPotato);
});

QUnit.test("GMOProductFactory.prototype.createTomato()", function (assert) {
	const factory = new GMOProductFactory();
	
	const result = factory.createTomato();

	assert.ok(result instanceof GMOTomato);
});

QUnit.test("ClassicProductFactory.prototype.createPotato()", function (assert) {
	const factory = new ClassicProductFactory();
	
	const result = factory.createPotato();

	assert.ok(result instanceof ClassicPotato);
});

QUnit.test("ClassicProductFactory.prototype.createTomato()", function (assert) {
	const factory = new ClassicProductFactory();
	
	const result = factory.createTomato();

	assert.ok(result instanceof ClassicTomato);
});

QUnit.test("FactoryClient.prototype.getTomato() ClassicProductFactory", function (assert) {
	const factory = new ClassicProductFactory();
	const client = new FactoryClient(factory);

	const result1 = client.getTomato();
	const result2 = client.getPotato();

	assert.ok(result1 instanceof ClassicTomato);
	assert.ok(result2 instanceof ClassicPotato);
});

QUnit.test("FactoryClient.prototype.getTomato() GMOProductFactory", function (assert) {
	const factory = new GMOProductFactory();
	const client = new FactoryClient(factory);

	const result1 = client.getTomato();
	const result2 = client.getPotato();

	assert.ok(result1 instanceof GMOTomato);
	assert.ok(result2 instanceof GMOPotato);
});