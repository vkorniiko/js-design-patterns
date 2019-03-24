"use strict";

const BaseBuilder = require("./BaseBuilder");

class ArrayDirector {
  constructor(baseBuilder, data) {
    if (!(baseBuilder instanceof BaseBuilder))
      throw new Error("Invalid argument 'baseBuilder'.");

    this.builder = baseBuilder;
    this.data = data;
  }
  construct() {
    this.data.forEach(element => {
      this.builder.buildNode(element);
    });
  }
}

module.exports = ArrayDirector;
