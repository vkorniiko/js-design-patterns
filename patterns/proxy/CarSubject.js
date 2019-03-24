"use strict";

const BaseVehicleSubject = require("./BaseVehicleSubject");

class CarSubject extends BaseVehicleSubject {
  move(distance) {
    return this.distance += distance;
  }
}

module.exports = CarSubject;
