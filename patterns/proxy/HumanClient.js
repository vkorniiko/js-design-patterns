"use strict";

const BaseVehicleSubject = require("./BaseVehicleSubject");

class HumanClient {
  move(vehicleSubject, distance) {
    if (!(vehicleSubject instanceof BaseVehicleSubject))
      throw new Error("Invalid argument 'vehicleSubject'.");

    return vehicleSubject.move(distance);
  }
}

module.exports = HumanClient;
