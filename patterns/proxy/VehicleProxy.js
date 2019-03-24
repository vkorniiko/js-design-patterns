"use strict";

const BaseVehicleSubject = require("./BaseVehicleSubject");

class VehicleProxy extends BaseVehicleSubject {
  constructor(vehicleSubject, allowMoving) {
    if (!(vehicleSubject instanceof BaseVehicleSubject))
      throw new Error("Invalid argument 'vehicleSubject'.");

    super();
    this.allowMoving = allowMoving;
    this.vehicleSubject = vehicleSubject;
  }
  move(distance) {
    if (this.allowMoving)
      this.vehicleSubject.move(distance);

    return this.vehicleSubject.distance;
  }
}

module.exports = VehicleProxy;
