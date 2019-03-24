"use strict";

const requireHelper = require("./_require_helper");
const testHelper = require("./_test_helper");
const TimeoutEmitter = requireHelper("../patterns/observer/TimeoutEmitter"),
      BaseEmitter = requireHelper("../patterns/observer/BaseEmitter"),
      BaseObserver = requireHelper("../patterns/observer/BaseObserver"),
      LoggerObserver = requireHelper("../patterns/observer/LoggerObserver");

QUnit.test("Check abstract types", (assert) => {
  testHelper.checkAbstract(BaseEmitter, assert);

  testHelper.checkAbstract(BaseObserver, assert);
  testHelper.checkAbstractMethods(BaseObserver,
    ["update"], assert);
});

QUnit.test("Check invalid arguments", (assert) => {
  testHelper.checkConstructorInvalidArguments(
    LoggerObserver, ["timeoutEmitter"], [], assert);

  testHelper.checkMethodInvalidArguments(
    BaseEmitter, "attach", ["observer"], [], assert);

  testHelper.checkMethodInvalidArguments(
      BaseEmitter, "detach", ["observer"], [], assert);
});

QUnit.test("TimeoutEmitter()", (assert) => {
  const result = new TimeoutEmitter();
  assert.deepEqual(result.observers, []);
});

QUnit.test("TimeoutEmitter.prototype.attach(observer)", (assert) => {
  const emitter = new TimeoutEmitter();
  const observer = new LoggerObserver(emitter);

  emitter.attach(observer);

  assert.deepEqual(emitter.observers, [observer, observer]);
});

QUnit.test("TimeoutEmitter.prototype.detach(observer)", (assert) => {
  const emitter = new TimeoutEmitter();
  const observer = new LoggerObserver(emitter);

  emitter.attach(observer);
  emitter.detach(observer);

  assert.deepEqual(emitter.observers, [observer]);
});

QUnit.test("TimeoutEmitter.prototype.getTime()", (assert) => {
  const emitter = new TimeoutEmitter();

  const result = emitter.getTime();

  assert.ok(result instanceof Date);
});

QUnit.test("TimeoutEmitter.prototype.run()", (assert) => {
  const done = assert.async();
  const emitter = new TimeoutEmitter();

  emitter.notify = function(){
    assert.ok(true);
    done();
  };

  emitter.run();
});

QUnit.test("LoggerObserver(timeoutEmitter)", (assert) => {
  const timeoutEmitter = new TimeoutEmitter();
  const observer = new LoggerObserver(timeoutEmitter);

  assert.strictEqual(observer.lastUpdateTime, null);
  assert.strictEqual(observer.emitter, timeoutEmitter);
});

QUnit.test("LoggerObserver.prototype.update(timeoutEmitter)", (assert) => {
  const timeoutEmitter = new TimeoutEmitter();
  const observer = new LoggerObserver(timeoutEmitter);

  observer.update();

  assert.ok(observer.lastUpdateTime instanceof Date);
  assert.strictEqual(observer.emitter, timeoutEmitter);
});

QUnit.test("LoggerObserver.prototype.update(timeoutEmitter) TimeoutEmitter.prototype.run()", (assert) => {
  const done = assert.async();
  const timeoutEmitter = new TimeoutEmitter();
  const observer = new LoggerObserver(timeoutEmitter);
  const origUpdate = observer.update.bind(observer);

  observer.update = function(){
    origUpdate();
    assert.ok(observer.lastUpdateTime instanceof Date);
    assert.strictEqual(observer.emitter, timeoutEmitter);
    done();
  };

  timeoutEmitter.run();
});
