class BaseItemsStorage{
	constructor(){
		if(new.target === BaseItemsStorage)
			throw new Error("Can't instantiate abstract type.");
	}

	createIterator(){
		throw new Error("Not implemented.");
	}
}

class List extends BaseItemsStorage {
	constructor(){
		super();

		this.firstChild = null;
		this.lastChild = null;
	}

	createIterator(){
		return new ListIterator(this);
	}
}

class BaseIterator {
	constructor(){
		if(new.target === BaseIterator)
			throw new Error("Can't instantiate abstract type.");
	}

	reset(){
		throw new Error("Not implemented.");
	}

	moveNext(){
		throw new Error("Not implemented.");
	}

	checkCompletion(){
		throw new Error("Not implemented.");
	}

	getCurrent(){
		throw new Error("Not implemented.");
	}
}

class ListIterator extends BaseIterator {
	constructor(list){
		super();

		if(!(list instanceof BaseItemsStorage))
			throw new Error("Invalid argument 'list'.");

		this.list = list;
		this.current = list.firstChild;
	}

	reset(){
		this.current = this.list.firstChild;
	}

	moveNext(){
		this.current = this.current.next;
	}

	checkCompletion(){
		return this.current === null || this.current.next === null;
	}

	getCurrent(){
		return this.current.data;
	}
}

class ES6ListIterator extends ListIterator {
	[Symbol.iterator](){
		return { 
			next: () => {
				const result = { value: this.getCurrent(), done: this.checkCompletion() };
				this.moveNext();
				return result;
			}
		};
	}
}

module.exports = {
	List,
	ListIterator,
	ES6ListIterator
};