"use strict";

class BaseVehicleSubject {
  constructor() {
    if (new.target === BaseVehicleSubject)
      throw new Error("Can't instantiate abstract type.");

    this.distance = 0;
  }

  move(distance) { /* eslint-disable-line no-unused-vars*/
    throw new Error("Not implemented.");
  }
}

module.exports = BaseVehicleSubject;
