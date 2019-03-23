"use strict";

const requireHelper = require("./_require_helper");
const testHelper = require("./_test_helper");
const { Chair, BaseFurnitureProduct, BaseFurnitureShop,
  ChairShop } = requireHelper("../patterns/factoryMethod/factoryMethod");

QUnit.test("Check abstract types", (assert) => {
  testHelper.checkAbstract(BaseFurnitureProduct, assert);
  testHelper.checkAbstract(BaseFurnitureShop, assert);
  testHelper.checkAbstractMethods(BaseFurnitureShop,
    ["createFurniture"], assert);
});

QUnit.test("Chair(cost, type)", (assert) => {
  const result = new Chair(100, Chair.chairTypes.office);

  assert.strictEqual(result.type, Chair.chairTypes.office);
  assert.strictEqual(result.cost, 100);
  assert.strictEqual(result.shipped, false);
});

QUnit.test("ChairShop.prototype.createFurniture()", (assert) => {
  const factory = new ChairShop();

  const result = factory.createFurniture();

  assert.ok(result instanceof Chair);
  assert.strictEqual(result.type, Chair.chairTypes.office);
  assert.strictEqual(result.cost, 100);
  assert.strictEqual(result.shipped, false);
});

QUnit.test("ChairShop.prototype.shipFurniture()", (assert) => {
  const factory = new ChairShop();

  const result = factory.shipFurniture();

  assert.ok(result instanceof Chair);
  assert.strictEqual(result.type, Chair.chairTypes.office);
  assert.strictEqual(result.cost, 100);
  assert.strictEqual(result.shipped, true);
});
