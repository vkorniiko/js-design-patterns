"use strict";

const BasePrototype = require("./BasePrototype");
const characterTypes = { number: "number", letter: "letter", symbol: "symbol" };

class Character extends BasePrototype {
  static get characterTypes() {
    return characterTypes;
  }

  constructor() {
    super();
    this.type = null;
    this.character = null;
    this.row = 0;
    this.col = 0;
  }

  clone() {
    const clone = new Character();
    clone.row = this.row;
    clone.col = this.col;
    clone.character = this.character;
    clone.type = this.type;
    return clone;
  }
}

module.exports = Character;
