function checkAbstract(Abstract, assert){
  try {
    new Abstract();
    assert.notOk(true);
  } catch (err) {
      assert.strictEqual(err.message, "Can't instantiate abstract type.");
  }
}

function checkAbstractMethods(Abstract, notImplementedMethods, assert){
  const prototype = Abstract.prototype;

  notImplementedMethods.forEach(methodName => {
    try {
      prototype[methodName].call({});
      assert.notOk(true);
    } catch (err) {
      assert.strictEqual(err.message, "Not implemented.");
    }
  });
}

function checkConstructorInvalidArguments(Type, argumentNames, validArguments, assert){
  argumentNames.forEach((argumentName, idx) => {
    const invalidArgs = [].concat(validArguments);
    invalidArgs[idx] = undefined;
    try {
      Reflect.construct(Type, invalidArgs);
      assert.notOk(true);
    } catch (err) {
      assert.strictEqual(err.message, `Invalid argument '${argumentName}'.`);
    }
  });
}

function checkMethodInvalidArguments(Type, methodName, argumentNames, validArguments, assert){
  const method = Type.prototype[methodName];

  argumentNames.forEach((argumentName, idx) => {
    const invalidArgs = [].concat(validArguments);
    invalidArgs[idx] = undefined;
    try {
      method.apply({}, invalidArgs);
      assert.notOk(true);
    } catch (err) {
      assert.strictEqual(err.message, `Invalid argument '${argumentName}'.`);
    }
  });
}

function shallowCopy(object) {
  var clone = {};
  var keys = Object.keys(object);

  for (let key of keys)
    clone[key] = object[key];

  return clone;
}

function checkInvalidProperties(Type, methodName, propertyNames, 
  defaultProperties, validArguments, assert){

  const method = Type.prototype[methodName];

  propertyNames.forEach((propertyName, idx) => {
    const validArgumentsClone = [].concat(validArguments);
    const invalidProperties = shallowCopy(defaultProperties);
    invalidProperties[propertyName] = undefined;
    try {
      method.apply(invalidProperties, validArgumentsClone);
      assert.notOk(true);
    } catch (err) {
      assert.strictEqual(err.message, `Invalid property '${propertyName}'.`);
    }
  });
}

module.exports = {
  checkAbstract,
  checkAbstractMethods,
  checkConstructorInvalidArguments,
  checkMethodInvalidArguments,
  checkInvalidProperties,
};