class BaseExpressionComponent {
	constructor(){
		if(new.target === BaseExpressionComponent)
			throw new Error("Can't instantiate abstract type.");

		this.parent = null;
	}

	toString(){
		throw new Error("Not implemented.");
	}

	add(){
		throw new Error("Not implemented.");
	}

	remove(){
		throw new Error("Not implemented.");
	}

	getChild(idx){
		throw new Error("Not implemented.");
	}
}

class BaseOperandLeaf extends BaseExpressionComponent {
	constructor(value){
		super();
		this.value = value;
	}
}

class NumberOperandLeaf extends BaseOperandLeaf {
	constructor(value){
		if(({}).toString.call(value) !== "[object Number]")
			throw new Error("Invalid argument 'value'.");

		super(value);
	}

	toString(){
		return this.value.toString();
	}
}

class BaseOperationComposite extends BaseExpressionComponent {
	constructor(){
		if(new.target === BaseOperationComposite)
			throw new Error("Can't instantiate abstract type.");

		super();
		this.children = [];
	}

	add(component){
		component.parent = this;
		this.children.push(component);
	}

	remove(component){
		if(this.children.length === 0)
			throw new Error("Invalid operation.");

		const idx = this.children.indexOf(component);

		if(idx === -1)
			throw new Error("Can't find component.");

		component.parent = null;
		this.children.splice(idx, 1);
	}

	getChild(idx){
		return this.children[idx];
	}
}

const operationTypes = { add : "+", remove: "-", divide: "/", multiply: "*" };
class BinaryOperationComposite extends BaseOperationComposite {
	static get operationTypes() {
		return operationTypes;
	}

	constructor(operationType){
		super();
		this.operationType = operationType;
	}

	add(component){
		if(this.children.length >= 2)
			throw new Error("Invalid operation.");

		super.add(component);
	}

	toString(){
		const leftOperand = this.getChild(0);

		if(leftOperand == null)
			throw new Error('Invalid operation!');

		const rightOperand = this.getChild(1);

		if(rightOperand == null)
			throw new Error('Invalid operation!');

		const operation = this.operationType;

		return `${leftOperand}${operation}${rightOperand}`;
	}
}

module.exports = {
	NumberOperandLeaf,
	BinaryOperationComposite
};