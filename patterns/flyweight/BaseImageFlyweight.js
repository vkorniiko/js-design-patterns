"use strict";

class BaseImageFlyweight {
  constructor() {
    if (new.target === BaseImageFlyweight)
      throw new Error("Can't instantiate abstract type.");
  }

  draw(context) {
    if (this.imageData == null)
      throw new Error("Invalid property 'imageData'.");

    context.drawImage(this.imageData);
  }
}

module.exports = BaseImageFlyweight;
