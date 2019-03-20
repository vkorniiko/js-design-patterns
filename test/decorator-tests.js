const { AnimalComponent, BaseAnimalDecorator, PigAnimalDecorator } = require('../patterns/decorator/decorator');

QUnit.test("AnimalComponent.prototype.eat(count)", function (assert) {
	const animalComponent = new AnimalComponent();
	
	const result = animalComponent.eat(5);

	assert.strictEqual(result, 5);
	assert.strictEqual(animalComponent.foodEaten, 5);
});

QUnit.test("PigAnimalDecorator()", function (assert) {
	const animalComponent = new AnimalComponent();
	const result = new PigAnimalDecorator(animalComponent);
	
	assert.strictEqual(result.grunted, false);
	assert.strictEqual(result.animalComponent, animalComponent);
});

QUnit.test("PigAnimalDecorator.prototype.eat(count)", function (assert) {
	const animalComponent = new AnimalComponent();
	const pigAnimalDecorator = new PigAnimalDecorator(animalComponent);
	
	const result = pigAnimalDecorator.eat(20);

	assert.strictEqual(result, 20);
	assert.strictEqual(pigAnimalDecorator.animalComponent.foodEaten, 20);
	assert.strictEqual(pigAnimalDecorator.grunted, true);
});

QUnit.test("PigAnimalDecorator.prototype.grunt()", function (assert) {
	const animalComponent = new AnimalComponent();
	const pigAnimalDecorator = new PigAnimalDecorator(animalComponent);
	
	pigAnimalDecorator.grunt();

	assert.strictEqual(pigAnimalDecorator.grunted, true);
	assert.strictEqual(pigAnimalDecorator.animalComponent, animalComponent);
});