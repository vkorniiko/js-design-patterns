class BaseVehicleSubject{
	constructor(){
		if(new.target === BaseVehicleSubject)
			throw new Error("Can't instantiate abstract type.");
		
		this.distance = 0;
	}

	move(distance){
		throw new Error("Not implemented.");
	}
}

class CarSubject extends BaseVehicleSubject {
	move(distance){
		return this.distance += distance;
	}
}

class VehicleProxy extends BaseVehicleSubject {
	constructor(vehicleSubject, allowMoving){
		if(!(vehicleSubject instanceof BaseVehicleSubject))
			throw new Error("Invalid argument 'vehicleSubject'.");
		
		super();
		this.allowMoving = allowMoving;
		this.vehicleSubject = vehicleSubject;
	}

	move(distance){
		if(this.allowMoving)
			this.vehicleSubject.move(distance);
		
		return this.vehicleSubject.distance;
	}
}

class HumanClient {
	move(vehicleSubject, distance){
		if(!(vehicleSubject instanceof BaseVehicleSubject))
			throw new Error("Invalid argument 'vehicleSubject'.");

		return vehicleSubject.move(distance);
	}
}

module.exports = {
	BaseVehicleSubject,
	CarSubject,
	VehicleProxy,
	HumanClient
};