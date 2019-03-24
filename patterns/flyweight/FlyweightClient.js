"use strict";

const IconFlyweight = require("./IconFlyweight");

class FlyweightClient {
  constructor(menuItemsEnum) {
    this.menuItemsEnum = menuItemsEnum;
  }

  drawMenu(flyweightFactory, menuDrawingContext) {
    this.menuItemsEnum.forEach(descriptor => {
      const flyweight = flyweightFactory.getFlyweight(descriptor.key);
      flyweight.draw(menuDrawingContext, descriptor.x, descriptor.y);
    });

    const specificX = 96, 
      specificY = 0, 
      specificIconFlyweight = new IconFlyweight("specificImageData");

    specificIconFlyweight.draw(menuDrawingContext, specificX, specificY);
  }
}

module.exports = FlyweightClient;
