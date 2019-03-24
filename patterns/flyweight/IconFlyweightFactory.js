"use strict";

const IconFlyweight = require("./IconFlyweight");

class IconFlyweightFactory {
  constructor(loader) {
    this.flyweights = new Map();
    this.loader = loader;
  }

  getFlyweight(key) {
    let result, imageData;

    if (this.flyweights.has(key))
      result = this.flyweights.get(key);
    else {
      imageData = this.loader.loadImageData(key);
      result = new IconFlyweight(imageData);
      this.flyweights.set(key, result);
    }

    return result;
  }
}

module.exports = IconFlyweightFactory;
