class BaseProductFactory {
	constructor(){
		if(new.target === BaseProductFactory)
			throw new Error("Can't instantiate abstract type.");
	}

	createPotato(){
		throw new Error("Not implemented.");
	}

	createTomato(){
		throw new Error("Not implemented.");
	}
}

class GMOProductFactory extends BaseProductFactory{
	createPotato(){
		var weight = 200;
		return new GMOPotato(weight);
	}

	createTomato(){
		var weight = 300;
		return new GMOTomato(weight);
	}
}

class ClassicProductFactory extends BaseProductFactory {
	createPotato(){
		var weight = 100 + Math.floor(Math.random() * 100);
		return new ClassicPotato(weight);
	}

	createTomato(){
		var weight = 100 + Math.floor(Math.random() * 200);
		return new ClassicTomato(weight);
	}
}

class BaseProduct {
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
		this.shape = "cube";
		this.legs = 5;
	}
}

class ClassicPotato extends BasePotato {
	constructor(weight){
		super(weight);
		this.shape = "round";
	}
}

class GMOTomato extends BaseTomato {
	constructor(weight){
		super(weight);
		this.shape = "cube";
		this.wings = 2;
	}
}

class ClassicTomato extends BaseTomato {
	constructor(weight){
		super(weight);
		this.shape = "round";
	}
}

class FactoryClient {
	constructor(productFactory){
		if(!(productFactory instanceof BaseProductFactory))
			throw new Error("Invalid argument 'productFactory'.");

		this.productFactory = productFactory;
	}

	getTomato(){
		var tomato = this.productFactory.createTomato();

		if(!(tomato instanceof BaseTomato))
			throw new Error("Invalid operation 'productFactory.createTomato()'.");

		return tomato;
	}

	getPotato(){
		var potato = this.productFactory.createPotato();

		if(!(potato instanceof BasePotato))
			throw new Error("Invalid operation 'productFactory.createPotato()'.");

		return potato;
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