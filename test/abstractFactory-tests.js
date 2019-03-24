"use strict";

const requireHelper = require("./_require_helper");
const testHelper = require("./_test_helper");
const FactoryClient = requireHelper("../patterns/abstractFactory/FactoryClient"); 
const GMOProductFactory = requireHelper("../patterns/abstractFactory/GMOProductFactory"); 
const ClassicProductFactory = requireHelper("../patterns/abstractFactory/ClassicProductFactory"); 
const BasePotato = requireHelper("../patterns/abstractFactory/BasePotato"); 
const BaseTomato = requireHelper("../patterns/abstractFactory/BaseTomato"); 
const BaseProductFactory = requireHelper("../patterns/abstractFactory/BaseProductFactory"); 
const GMOPotato = requireHelper("../patterns/abstractFactory/GMOPotato"); 
const GMOTomato = requireHelper("../patterns/abstractFactory/GMOTomato"); 
const ClassicPotato = requireHelper("../patterns/abstractFactory/ClassicPotato"); 
const ClassicTomato = requireHelper("../patterns/abstractFactory/ClassicTomato"); 
const BaseProduct = requireHelper("../patterns/abstractFactory/BaseProduct");

QUnit.test("Check abstract types", (assert) => {
	testHelper.checkAbstract(BaseProductFactory, assert);
	testHelper.checkAbstract(BaseProduct, assert);
	testHelper.checkAbstract(BasePotato, assert);
	testHelper.checkAbstract(BaseTomato, assert);
});

QUnit.test("Check invalid arguments", (assert) => {
  testHelper.checkConstructorInvalidArguments(
    FactoryClient, ["productFactory"], [], assert);

  testHelper.checkMethodInvalidArguments(
    BaseProductFactory, "createPotato", ["baseProduct"], [], assert);

  testHelper.checkMethodInvalidArguments(
    BaseProductFactory, "createTomato", ["baseProduct"], [], assert);
});

QUnit.test("ClassicPotato()", (assert) => {
  const result = new ClassicPotato(100);

  assert.ok(result instanceof ClassicPotato);
  assert.ok(result.rootCrop);
  assert.ok(result.vegetable);
  assert.strictEqual(result.shape, BaseProduct.shapeTypes.sphere);
  assert.strictEqual(result.weight, 100);
});

QUnit.test("ClassicTomato()", (assert) => {
  const result = new ClassicTomato(100);

  assert.ok(result instanceof ClassicTomato);
  assert.ok(result.vegetable);
  assert.strictEqual(result.shape, BaseProduct.shapeTypes.sphere);
  assert.strictEqual(result.weight, 100);
});

QUnit.test("GMOPotato()", (assert) => {
  const result = new GMOPotato(100);

  assert.ok(result instanceof GMOPotato);
  assert.ok(result.rootCrop);
  assert.ok(result.vegetable);
  assert.strictEqual(result.shape, BaseProduct.shapeTypes.cube);
  assert.strictEqual(result.weight, 100);
  assert.strictEqual(result.legs, 5);
});

QUnit.test("GMOTomato()", (assert) => {
  const result = new GMOTomato(100);

  assert.ok(result instanceof GMOTomato);
  assert.ok(result.vegetable);
  assert.strictEqual(result.shape, BaseProduct.shapeTypes.cube);
  assert.strictEqual(result.weight, 100);
  assert.strictEqual(result.wings, 2);
});

QUnit.test("GMOProductFactory.prototype.createPotato()", (assert) => {
  const factory = new GMOProductFactory();

  const result = factory.createPotato();

  assert.ok(result instanceof GMOPotato);
});

QUnit.test("GMOProductFactory.prototype.createTomato()", (assert) => {
  const factory = new GMOProductFactory();

  const result = factory.createTomato();

  assert.ok(result instanceof GMOTomato);
});

QUnit.test("ClassicProductFactory.prototype.createPotato()", (assert) => {
  const factory = new ClassicProductFactory();

  const result = factory.createPotato();

  assert.ok(result instanceof ClassicPotato);
});

QUnit.test("ClassicProductFactory.prototype.createTomato()", (assert) => {
  const factory = new ClassicProductFactory();

  const result = factory.createTomato();

  assert.ok(result instanceof ClassicTomato);
});

QUnit.test("FactoryClient.prototype.getTomato() ClassicProductFactory", (assert) => {
  const factory = new ClassicProductFactory();
  const client = new FactoryClient(factory);

  const result1 = client.getTomato();
  const result2 = client.getPotato();

  assert.ok(result1 instanceof ClassicTomato);
  assert.ok(result2 instanceof ClassicPotato);
});

QUnit.test("FactoryClient.prototype.getTomato() GMOProductFactory", (assert) => {
  const factory = new GMOProductFactory();
  const client = new FactoryClient(factory);

  const result1 = client.getTomato();
  const result2 = client.getPotato();

  assert.ok(result1 instanceof GMOTomato);
  assert.ok(result2 instanceof GMOPotato);
});
