const { TimeoutEmitter, LoggerObserver } = require('../patterns/observer/observer');

QUnit.test("TimeoutEmitter()", function (assert) {
	const result = new TimeoutEmitter();
	
	assert.deepEqual(result.observers, []);
});

QUnit.test("TimeoutEmitter.prototype.attach(observer)", function (assert) {
	const emitter = new TimeoutEmitter();
	const observer = new LoggerObserver(emitter);

	emitter.attach(observer);

	assert.deepEqual(emitter.observers, [observer, observer]);
});

QUnit.test("TimeoutEmitter.prototype.detach(observer)", function (assert) {
	const emitter = new TimeoutEmitter();
	const observer = new LoggerObserver(emitter);

	emitter.attach(observer);
	emitter.detach(observer);

	assert.deepEqual(emitter.observers, [observer]);
});

QUnit.test("TimeoutEmitter.prototype.getTime()", function (assert) {
	const emitter = new TimeoutEmitter();

	const result = emitter.getTime();

	assert.ok(result instanceof Date);
});

QUnit.test("TimeoutEmitter.prototype.run()", function (assert) {
	const done = assert.async();
	const emitter = new TimeoutEmitter();

	emitter.notify = function(){
		assert.ok(true);
		done();
	}

	emitter.run();
});

QUnit.test("LoggerObserver(timeoutEmitter)", function (assert) {
	const timeoutEmitter = new TimeoutEmitter();
	const observer = new LoggerObserver(timeoutEmitter);

	assert.strictEqual(observer.lastUpdateTime, null);
	assert.strictEqual(observer.emitter, timeoutEmitter);
});

QUnit.test("LoggerObserver.prototype.update(timeoutEmitter)", function (assert) {
	const timeoutEmitter = new TimeoutEmitter();
	const observer = new LoggerObserver(timeoutEmitter);

	observer.update();

	assert.ok(observer.lastUpdateTime instanceof Date);
	assert.strictEqual(observer.emitter, timeoutEmitter);
});

QUnit.test("LoggerObserver.prototype.update(timeoutEmitter) TimeoutEmitter.prototype.run()", function (assert) {
	const done = assert.async();
	const timeoutEmitter = new TimeoutEmitter();
	const observer = new LoggerObserver(timeoutEmitter);
	const origUpdate = observer.update.bind(observer);

	observer.update = function(){
		origUpdate();
		assert.ok(observer.lastUpdateTime instanceof Date);
		assert.strictEqual(observer.emitter, timeoutEmitter);
		done();
	}

	timeoutEmitter.run();
});