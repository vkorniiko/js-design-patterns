"use strict";

const requireHelper = require("./_require_helper");
const testHelper = require("./_test_helper");
const AnimalComponent = requireHelper("../patterns/decorator/AnimalComponent"),
      BaseAnimalDecorator = requireHelper("../patterns/decorator/BaseAnimalDecorator"),
      PigAnimalDecorator = requireHelper("../patterns/decorator/PigAnimalDecorator");

QUnit.test("Check abstract types", (assert) => {
  testHelper.checkAbstract(BaseAnimalDecorator, assert);
});

QUnit.test("Check invalid arguments", (assert) => {
  testHelper.checkConstructorInvalidArguments(
    PigAnimalDecorator, ["animalComponent"], [], assert);
});

QUnit.test("AnimalComponent.prototype.eat(count)", (assert) => {
  const animalComponent = new AnimalComponent();

  const result = animalComponent.eat(5);

  assert.strictEqual(result, 5);
  assert.strictEqual(animalComponent.foodEaten, 5);
});

QUnit.test("PigAnimalDecorator()", (assert) => {
  const animalComponent = new AnimalComponent();
  const result = new PigAnimalDecorator(animalComponent);

  assert.strictEqual(result.grunted, false);
  assert.strictEqual(result.animalComponent, animalComponent);
});

QUnit.test("PigAnimalDecorator.prototype.eat(count)", (assert) => {
  const animalComponent = new AnimalComponent();
  const pigAnimalDecorator = new PigAnimalDecorator(animalComponent);

  const result = pigAnimalDecorator.eat(20);

  assert.strictEqual(result, 20);
  assert.strictEqual(pigAnimalDecorator.animalComponent.foodEaten, 20);
  assert.strictEqual(pigAnimalDecorator.grunted, true);
});

QUnit.test("PigAnimalDecorator.prototype.grunt()", (assert) => {
  const animalComponent = new AnimalComponent();
  const pigAnimalDecorator = new PigAnimalDecorator(animalComponent);

  pigAnimalDecorator.grunt();

  assert.strictEqual(pigAnimalDecorator.grunted, true);
  assert.strictEqual(pigAnimalDecorator.animalComponent, animalComponent);
});
