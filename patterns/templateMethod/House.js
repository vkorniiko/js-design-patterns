"use strict";

const BaseHouse = require("./BaseHouse");
const parts = { 
  foundationPit: "foundationPit", 
  foundation: "foundation",
  walls: "walls", 
  doors: "doors", 
  windows: "windows", 
  roof: "roof" 
};

class House extends BaseHouse {
  static get parts() {
    return parts;
  }

  digFoundationPit() {
    this.builtParts.push(House.parts.foundationPit);
  }

  layFoundation() {
    this.builtParts.push(House.parts.foundation);
  }

  buildWalls() {
    this.builtParts.push(House.parts.walls);
    super.buildWalls();
  }

  installDoors() {
    this.builtParts.push(House.parts.doors);
  }

  installWindows() {
    this.builtParts.push(House.parts.windows);
  }

  installRoof() {
    this.builtParts.push(House.parts.roof);
  }
}

module.exports = House;
