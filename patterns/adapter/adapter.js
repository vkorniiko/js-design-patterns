class AreaCalculatorAdaptee {
	constructor(){
		this.area = 0;
	}

	calculateArea(width, height){
		return this.area = width * height;
	}
}

class BaseCalculatorAdapter{
	get area(){
		return this.areaCalculatorAdaptee.area;
	}

	constructor(areaCalculatorAdaptee){
		if(new.target === BaseCalculatorAdapter)
			throw new Error("Can't instantiate abstract type.");

		this.areaCalculatorAdaptee = areaCalculatorAdaptee;
	}

	calculate(width, height){
		throw new Error("Not implemented.");
	}	
}

class StringAreaCalculatorAdapter extends BaseCalculatorAdapter {
	calculate(widthStr, heightStr){
		const width = parseFloat(widthStr);
		const height = parseFloat(heightStr);
		return this.areaCalculatorAdaptee.calculateArea(width, height);
	}
}

class NumberAreaCalculatorAdapter extends BaseCalculatorAdapter {
	calculate(width, height){
		return this.areaCalculatorAdaptee.calculateArea(width, height);
	}
}

class Client {
	calculate(calculator, width, height){
		if(!(calculator instanceof BaseCalculatorAdapter))
			throw new Error("Invalid argument 'calculator'.");

		return calculator.calculate(width, height);
	}
}

module.exports = {
	AreaCalculatorAdaptee,
	BaseCalculatorAdapter,
	StringAreaCalculatorAdapter,
	NumberAreaCalculatorAdapter,
	Client
};
