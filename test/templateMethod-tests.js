const { House } = require('../patterns/templateMethod/templateMethod');

QUnit.test("House()", function (assert) {
	const result = new House();

	assert.deepEqual(result.builtParts, []);
});

QUnit.test("House.prototype.digFoundationPit()", function (assert) {
	const house = new House();

	house.digFoundationPit();

	assert.deepEqual(house.builtParts, [House.parts.foundationPit]);
});

QUnit.test("House.prototype.layFoundation()", function (assert) {
	const house = new House();

	house.layFoundation();

	assert.deepEqual(house.builtParts, [House.parts.foundation]);
});

QUnit.test("House.prototype.installDoors()", function (assert) {
	const house = new House();

	house.installDoors();

	assert.deepEqual(house.builtParts, [House.parts.doors]);
});

QUnit.test("House.prototype.installWindows()", function (assert) {
	const house = new House();

	house.installWindows();

	assert.deepEqual(house.builtParts, [House.parts.windows]);
});

QUnit.test("House.prototype.installRoof()", function (assert) {
	const house = new House();

	house.installRoof();

	assert.deepEqual(house.builtParts, [House.parts.roof]);
});

QUnit.test("House.prototype.buildWalls()", function (assert) {
	const house = new House();

	house.buildWalls();

	assert.deepEqual(house.builtParts, [House.parts.walls, House.parts.doors, House.parts.windows]);
});

QUnit.test("House.prototype.build()", function (assert) {
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