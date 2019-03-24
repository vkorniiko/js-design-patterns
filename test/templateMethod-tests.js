"use strict";

const requireHelper = require("./_require_helper");
const testHelper = require("./_test_helper");
const BaseHouse = requireHelper("../patterns/templateMethod/BaseHouse"), 
      House = requireHelper("../patterns/templateMethod/House");

QUnit.test("Check abstract types", (assert) => {
  testHelper.checkAbstract(BaseHouse, assert);
  testHelper.checkAbstractMethods(BaseHouse,
    ["digFoundationPit", "layFoundation", "installDoors", "installWindows", "installRoof"], assert);
});

QUnit.test("House()", (assert) => {
  const result = new House();

  assert.deepEqual(result.builtParts, []);
});

QUnit.test("House.prototype.digFoundationPit()", (assert) => {
  const house = new House();

  house.digFoundationPit();

  assert.deepEqual(house.builtParts, [House.parts.foundationPit]);
});

QUnit.test("House.prototype.layFoundation()", (assert) => {
  const house = new House();

  house.layFoundation();

  assert.deepEqual(house.builtParts, [House.parts.foundation]);
});

QUnit.test("House.prototype.installDoors()", (assert) => {
  const house = new House();

  house.installDoors();

  assert.deepEqual(house.builtParts, [House.parts.doors]);
});

QUnit.test("House.prototype.installWindows()", (assert) => {
  const house = new House();

  house.installWindows();

  assert.deepEqual(house.builtParts, [House.parts.windows]);
});

QUnit.test("House.prototype.installRoof()", (assert) => {
  const house = new House();

  house.installRoof();

  assert.deepEqual(house.builtParts, [House.parts.roof]);
});

QUnit.test("House.prototype.buildWalls()", (assert) => {
  const house = new House();

  house.buildWalls();

  assert.deepEqual(house.builtParts,
    [House.parts.walls, House.parts.doors, House.parts.windows]);
});

QUnit.test("House.prototype.build()", (assert) => {
  const house = new House();

  house.build();

  assert.deepEqual(house.builtParts, [
    House.parts.foundationPit,
    House.parts.foundation,
    House.parts.walls,
    House.parts.doors,
    House.parts.windows,
    House.parts.roof
  ]);
});
