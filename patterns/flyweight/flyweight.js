"use strict";

class BaseImageFlyweight {
  constructor(){
    if(new.target === BaseImageFlyweight)
      throw new Error("Can't instantiate abstract type.");
  }

  draw(context){
    if(this.imageData == null)
      throw new Error("Invalid property 'imageData'.");

    context.drawImage(this.imageData);
  }
}

class IconFlyweight extends BaseImageFlyweight {
  constructor(imageData){
    super();
    this.imageData = imageData;
  }

  draw(context, x, y){
    context.moveTo(x, y);
    super.draw(context);
  }
}

class IconFlyweightFactory {
  constructor(loader){
    this.flyweights = new Map();
    this.loader = loader;
  }

  getFlyweight(key){
    let result, imageData;

    if(this.flyweights.has(key))
      result = this.flyweights.get(key);
    else {
      imageData = this.loader.loadImageData(key);
      result = new IconFlyweight(imageData);
      this.flyweights.set(key, result);
    }

    return result;
  }
}

class FlyweightClient {
  constructor(menuItemsEnum){
    this.menuItemsEnum = menuItemsEnum;
  }

  drawMenu(flyweightFactory, menuDrawingContext){
    this.menuItemsEnum.forEach(descriptorObject => {
      const flyweight = flyweightFactory.getFlyweight(descriptorObject.key);

      flyweight.draw(menuDrawingContext, descriptorObject.x, 
        descriptorObject.y);
    });

    const specificX = 96,
      specificY = 0,
      specificIconFlyweight = new IconFlyweight("specificImageData");

    specificIconFlyweight.draw(menuDrawingContext, specificX, specificY);
  }
}

module.exports = {
  BaseImageFlyweight,
  FlyweightClient,
  IconFlyweightFactory,
  IconFlyweight
};
