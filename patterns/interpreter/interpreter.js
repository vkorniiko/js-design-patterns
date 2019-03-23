"use strict";

class BaseExpression {
  constructor(){
    if(new.target === BaseExpression)
      throw new Error("Can't instantiate abstract type.");
  }

  evaluate(context){ //eslint-disable-line no-unused-vars
    throw new Error("Not implemented.");
  }
}

class VariableExpression extends BaseExpression {
  constructor(name){
    if(({}).toString.call(name) !== "[object String]")
      throw new Error("Invalid argument 'name'.");

    super();
    this.name = name;
  }

  evaluate(context){
    return context[this.name];
  }
}

class ConstantExpression extends BaseExpression {
  constructor(value){
    if(({}).toString.call(value) !== "[object Number]")
      throw new Error("Invalid argument 'value'.");

    super();
    this.value = value;
  }

  evaluate(context){ //eslint-disable-line no-unused-vars
    return this.value;
  }
}

class BaseOperationExpression extends BaseExpression {
  constructor(expression1, expression2){
    if(new.target === BaseOperationExpression)
      throw new Error("Can't instantiate abstract type.");

    if(!(expression1 instanceof BaseExpression))
      throw new Error("Invalid argument 'expression1'.");

    if(!(expression2 instanceof BaseExpression))
      throw new Error("Invalid argument 'expression2'.");

    super();
    this.operand1 = expression1;
    this.operand2 = expression2;
  }
}

class AddExpression extends BaseOperationExpression {
  evaluate(context){
    return this.operand1.evaluate(context) + this.operand2.evaluate(context);
  }
}

class SubtractExpression extends BaseOperationExpression {
  evaluate(context){
    return this.operand1.evaluate(context) - this.operand2.evaluate(context);
  }
}

class MultiplyExpression extends BaseOperationExpression {
  evaluate(context){
    return this.operand1.evaluate(context) * this.operand2.evaluate(context);
  }
}

class DivideExpression extends BaseOperationExpression {
  evaluate(context){
    return this.operand1.evaluate(context) / this.operand2.evaluate(context);
  }
}

module.exports = {
  BaseExpression,
  BaseOperationExpression,
  VariableExpression,
  ConstantExpression,
  AddExpression,
  SubtractExpression,
  MultiplyExpression,
  DivideExpression
};
