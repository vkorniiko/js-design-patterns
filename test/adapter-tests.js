const { AreaCalculatorAdaptee, Client, NumberAreaCalculatorAdapter, StringAreaCalculatorAdapter } = require('../patterns/adapter/adapter');

QUnit.test("AreaCalculatorAdaptee.prototype.calculateArea(width, height)", function (assert) {
	const areaAdaptee = new AreaCalculatorAdaptee();
	
	const result = areaAdaptee.calculateArea(3,3);

	assert.strictEqual(result, 9);
	assert.strictEqual(areaAdaptee.area, 9);
});

QUnit.test("StringAreaCalculatorAdapter()", function (assert) {
	const areaAdaptee = new AreaCalculatorAdaptee();
	const result = new StringAreaCalculatorAdapter(areaAdaptee);

	assert.strictEqual(result.areaCalculatorAdaptee, areaAdaptee);
});

QUnit.test("NumberAreaCalculatorAdapter()", function (assert) {
	const areaAdaptee = new AreaCalculatorAdaptee();
	const result = new NumberAreaCalculatorAdapter(areaAdaptee);

	assert.strictEqual(result.areaCalculatorAdaptee, areaAdaptee);
});

QUnit.test("StringAreaCalculatorAdapter.prototype.calculate(widthStr, heightStr)", function (assert) {
	const areaAdaptee = new AreaCalculatorAdaptee();
	const stringAreaCalculatorAdapter = new StringAreaCalculatorAdapter(areaAdaptee);

	const result = stringAreaCalculatorAdapter.calculate("5", "5");

	assert.strictEqual(result, 25);
	assert.strictEqual(stringAreaCalculatorAdapter.area, 25);
});

QUnit.test("NumberAreaCalculatorAdapter.prototype.calculate(widthStr, heightStr)", function (assert) {
	const areaAdaptee = new AreaCalculatorAdaptee();
	const stringAreaCalculatorAdapter = new NumberAreaCalculatorAdapter(areaAdaptee);

	const result = stringAreaCalculatorAdapter.calculate(4, 4);

	assert.strictEqual(result, 16);
	assert.strictEqual(stringAreaCalculatorAdapter.area, 16);
});

QUnit.test("Client.prototype.calculate(calculator, width, height)", function (assert) {
	const areaAdaptee1 = new AreaCalculatorAdaptee();
	const areaAdaptee2 = new AreaCalculatorAdaptee();
	const stringAdapter = new StringAreaCalculatorAdapter(areaAdaptee1);
	const numberAdapter = new NumberAreaCalculatorAdapter(areaAdaptee2);
	const client = new Client();

	const result1 = client.calculate(numberAdapter, 1, 2);
	assert.strictEqual(result1, 2);

	const result2 = client.calculate(stringAdapter, "1", "2");
	assert.strictEqual(result2, 2);
});