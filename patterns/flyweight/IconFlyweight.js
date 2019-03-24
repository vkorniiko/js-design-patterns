"use strict";

const BaseImageFlyweight  = require("./BaseImageFlyweight");

class IconFlyweight extends BaseImageFlyweight {
  constructor(imageData) {
    super();
    this.imageData = imageData;
  }

  draw(context, x, y) {
    context.moveTo(x, y);
    super.draw(context);
  }
}

module.exports = IconFlyweight;
