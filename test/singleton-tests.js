const { ApplicationSingleton } = require('../patterns/singleton/singleton');

QUnit.test("ApplicationSingleton.instance()", function (assert) {
	const singleton1 = new ApplicationSingleton();
	const singleton2 = new ApplicationSingleton();
	const singleton3 = ApplicationSingleton.instance();
	const singleton4 = ApplicationSingleton.instance();
	
	assert.ok(singleton1 instanceof ApplicationSingleton);
	assert.ok(singleton2 instanceof ApplicationSingleton);
	assert.ok(singleton3 instanceof ApplicationSingleton);
	assert.ok(singleton4 instanceof ApplicationSingleton);

	assert.strictEqual(singleton1, singleton2);
	assert.strictEqual(singleton2, singleton3);
	assert.strictEqual(singleton3, singleton4);
});

QUnit.test("ApplicationSingleton.instance() wrong", function (assert) {
	const singleton1 = new ApplicationSingleton();
	
	delete ApplicationSingleton.uniqueInstance;
	assert.strictEqual(ApplicationSingleton.instance(), singleton1);

	ApplicationSingleton.uniqueInstance = 0;
	assert.strictEqual(ApplicationSingleton.instance(), singleton1);

	try{
		Object.defineProperty(ApplicationSingleton, "uniqueInstance", {
			value: 0
		});

		assert.notOk(true);
	} catch(exp){
		assert.ok(true);
	}

	assert.strictEqual(ApplicationSingleton.instance(), singleton1);
});

QUnit.test("ApplicationSingleton.prototype.initialize()", function (assert) {
	const singleton1 = new ApplicationSingleton();
	const singleton2 = new ApplicationSingleton();
	const singleton3 = ApplicationSingleton.instance();
	const singleton4 = ApplicationSingleton.instance();
	
	singleton1.initialize();

	assert.strictEqual(singleton1.isInitialized, true);
	assert.strictEqual(singleton2.isInitialized, true);
	assert.strictEqual(singleton3.isInitialized, true);
	assert.strictEqual(singleton4.isInitialized, true);
});