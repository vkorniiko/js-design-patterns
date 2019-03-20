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

class RocketBaseState { 
	constructor(fuelQuantity){
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

class RocketStandingState extends RocketBaseState {
	constructor(){
		super("full");
	}

	flyUp(context){
		context.state = new RocketFlyingUpState();
	}
}

class RocketFlyingUpState extends RocketBaseState {
	constructor(){
		super("partiallyFull");
	}

	fly(context){
		context.state = new RocketFlyingState();
	}
}

class RocketFlyingState extends RocketBaseState {
	constructor(){
		super("partiallyEmpty");
	}

	land(context){
		context.state = new RocketLandingState();
	}
}

class RocketLandingState extends RocketBaseState {
	constructor(){
		super("empty");
	}
}

module.exports = {
	RocketContext,
	RocketStandingState,
	RocketFlyingUpState,
	RocketFlyingState,
	RocketLandingState
};