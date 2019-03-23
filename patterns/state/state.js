"use strict";

class RocketContext {
  constructor(){
    this.state = new RocketStandingState();
  }

  flyUp(){
    this.state.flyUp(this);
  }

  fly(){
    this.state.fly(this);
  }

  land(){
    this.state.land(this);
  }

  getFuelQuantity(){
    return this.state.fuelQuantity;
  }
}

class BaseRocketState { 
  constructor(fuelQuantity){
    if(new.target === BaseRocketState)
      throw new Error("Can't instantiate abstract type.");

    this.fuelQuantity = fuelQuantity;
  }

  flyUp(){
    throw new Error("Not implemented.");
  }

  fly(){
    throw new Error("Not implemented.");
  }

  land(){
    throw new Error("Not implemented.");
  }
}

class RocketStandingState extends BaseRocketState {
  constructor(){
    super("full");
  }

  flyUp(context){
    context.state = new RocketFlyingUpState();
  }
}

class RocketFlyingUpState extends BaseRocketState {
  constructor(){
    super("partiallyFull");
  }

  fly(context){
    context.state = new RocketFlyingState();
  }
}

class RocketFlyingState extends BaseRocketState {
  constructor(){
    super("partiallyEmpty");
  }

  land(context){
    context.state = new RocketLandingState();
  }
}

class RocketLandingState extends BaseRocketState {
  constructor(){
    super("empty");
  }
}

module.exports = {
  BaseRocketState,
  RocketContext,
  RocketStandingState,
  RocketFlyingUpState,
  RocketFlyingState,
  RocketLandingState
};
