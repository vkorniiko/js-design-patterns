"use strict";

class BaseFurnitureProduct {
  constructor(cost){
    if(new.target === BaseFurnitureProduct)
      throw new Error("Can't instantiate abstract type.");

    this.cost = cost;
    this.shipped = false;
  }
}

const chairTypes = { office: "office", "home": "home" };
class Chair extends BaseFurnitureProduct {
  static get chairTypes(){
    return chairTypes;
  }

  constructor(cost, type){
    super(cost);
    this.type = type;
  }
}

class BaseFurnitureShop {
  constructor(){
    if(new.target === BaseFurnitureShop)
      throw new Error("Can't instantiate abstract type.");
  }

  createFurniture(){
    throw new Error("Not implemented.");
  }

  shipFurniture(){
    let furniture = this.createFurniture();
    furniture.shipped = true;
    return furniture;
  }
}

class ChairShop extends BaseFurnitureShop {
  createFurniture(){
    const type = Chair.chairTypes.office,
      cost = 100;

    return new Chair(cost, type);
  }
}

module.exports = {
  BaseFurnitureProduct,
  BaseFurnitureShop,
  Chair,
  ChairShop
};
