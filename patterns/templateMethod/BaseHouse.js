"use strict";

class BaseHouse {
  constructor() {
    if (new.target === BaseHouse)
      throw new Error("Can't instantiate abstract type.");

    this.builtParts = [];
  }

  build() {
    this.digFoundationPit();
    this.layFoundation();
    this.buildWalls();
    this.installRoof();
  }

  digFoundationPit() {
    throw new Error("Not implemented.");
  }

  layFoundation() {
    throw new Error("Not implemented.");
  }

  buildWalls() {
    this.installDoors();
    this.installWindows();
  }

  installDoors() {
    throw new Error("Not implemented.");
  }

  installWindows() {
    throw new Error("Not implemented.");
  }

  installRoof() {
    throw new Error("Not implemented.");
  }
}

module.exports = BaseHouse;
