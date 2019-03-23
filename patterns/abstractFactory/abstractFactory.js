"use strict";

class BaseProductFactory {
  constructor(){
    if(new.target === BaseProductFactory)
      throw new Error("Can't instantiate abstract type.");
  }

  createPotato(baseProduct){
    if(!(baseProduct instanceof BaseProduct))
      throw new Error("Invalid argument 'baseProduct'.");
    
    return baseProduct;
  }

  createTomato(baseProduct){
    if(!(baseProduct instanceof BaseProduct))
      throw new Error("Invalid argument 'baseProduct'.");
    
    return baseProduct;
  }
}

class GMOProductFactory extends BaseProductFactory{
  createPotato(){
    const weight = 200;
    return super.createPotato(new GMOPotato(weight));
  }

  createTomato(){
    const weight = 300;
    return super.createTomato(new GMOTomato(weight));
  }
}

class ClassicProductFactory extends BaseProductFactory {
  createPotato(){
    const minWeight = 100,
      weightRange = 100,
      weight = minWeight + Math.floor(Math.random() * weightRange);

    return new ClassicPotato(weight);
  }

  createTomato(){
    const minWeight = 100,
      weightRange = 200,
      weight = minWeight + Math.floor(Math.random() * weightRange);

    return new ClassicTomato(weight);
  }
}

const shapeTypes = { "sphere": "sphere", cube: "cube" };
class BaseProduct {
  static get shapeTypes(){
    return shapeTypes;
  }

  constructor(weight){
    if(new.target === BaseProduct)
      throw new Error("Can't instantiate abstract type.");

    this.weight = weight; 
  }
}

class BasePotato extends BaseProduct {
  constructor(weight){
    if(new.target === BasePotato)
      throw new Error("Can't instantiate abstract type.");

    super(weight); 
    this.rootCrop = true;
    this.vegetable = true;
  }
}

class BaseTomato extends BaseProduct {
  constructor(weight){
    if(new.target === BaseTomato)
      throw new Error("Can't instantiate abstract type.");

    super(weight); 
    this.vegetable = true;
  }
}

class GMOPotato extends BasePotato {
  constructor(weight){
    super(weight);
    this.shape = BaseProduct.shapeTypes.cube;
    this.legs = 5;
  }
}

class ClassicPotato extends BasePotato {
  constructor(weight){
    super(weight);
    this.shape = BaseProduct.shapeTypes.sphere;
  }
}

class GMOTomato extends BaseTomato {
  constructor(weight){
    super(weight);
    this.shape = BaseProduct.shapeTypes.cube;
    this.wings = 2;
  }
}

class ClassicTomato extends BaseTomato {
  constructor(weight){
    super(weight);
    this.shape = BaseProduct.shapeTypes.sphere;
  }
}

class FactoryClient {
  constructor(productFactory){
    if(!(productFactory instanceof BaseProductFactory))
      throw new Error("Invalid argument 'productFactory'.");

    this.productFactory = productFactory;
  }

  getTomato(){
    return this.productFactory.createTomato();
  }

  getPotato(){
    return this.productFactory.createPotato();
  }
}

module.exports = {
  BaseProduct,
  BasePotato,
  BaseTomato,
  BaseProductFactory,
  GMOProductFactory,
  ClassicProductFactory,
  GMOPotato,
  GMOTomato,
  ClassicPotato,
  ClassicTomato,
  FactoryClient
};
