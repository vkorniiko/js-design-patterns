const { LinearSearchStrategy, BinarySearchStrategy, SearchContext } = require('../patterns/strategy/strategy');

QUnit.test("LinearSearchStrategy.prototype.search(array, number)", function (assert) {
	const linearSearchStrategy = new LinearSearchStrategy();
	const array = [0,10,20,30,40,50,60,70,80,90];
	const number = 50;

	const result = linearSearchStrategy.search(array, number);

	assert.strictEqual(result, 5);
});

QUnit.test("BinarySearchStrategy.prototype.search(array, number)", function (assert) {
	const binarySearchStrategy = new BinarySearchStrategy();
	const array = [0,10,20,30,40,50,60,70,80,90];
	const number = 50;

	const result = binarySearchStrategy.search(array, number);

	assert.strictEqual(result, 5);
});

QUnit.test("SearchContext()", function (assert) {
	const result = new SearchContext();

	assert.ok(result.strategies.get(SearchContext.arrayTypes.unsorted) instanceof LinearSearchStrategy);
	assert.ok(result.strategies.get(SearchContext.arrayTypes.sorted) instanceof BinarySearchStrategy);
});

QUnit.test("SearchContext.prototype.search(array, number, arrayType)", function (assert) {
	const context = new SearchContext();
	const array1 = [90,10,80,30,70,40,60,50,20,0];
	const array2 = [0,10,20,30,40,50,60,70,80,90];
	const number = 50;

	const result1 = context.search(array1, number, SearchContext.arrayTypes.unsorted);
	const result2 = context.search(array2, number, SearchContext.arrayTypes.sorted);

	assert.strictEqual(result1, 7);
	assert.strictEqual(result2, 5);	
});