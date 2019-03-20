class BaseDBImplementor {
	constructor(){
		if(new.target === BaseDBImplementor)
			throw new Error("Can't instantiate abstract type.");
	}

	select(tableName){
		throw new Error("Not implemented.");
	}

	update(tableName, clones){
		throw new Error("Not implemented.");
	}

	delete(tableName, clones){
		throw new Error("Not implemented.");
	}

	insert(tableName, clones){
		throw new Error("Not implemented.");
	}
}

//concrete query implementation for db1
class DB1Implementor extends BaseDBImplementor {
	select(tableName){ return new Promise(()=>{},()=>{}); }

	update(tableName, clones){ return new Promise(()=>{},()=>{}); }

	delete(tableName, clones){ return new Promise(()=>{},()=>{}); }

	insert(tableName, clones){return new Promise(()=>{},()=>{}); }
}

//concrete query implementation for db2
class DB2Implementor extends BaseDBImplementor {
	select(tableName){ return new Promise(()=>{},()=>{}); }

	update(tableName, clones){ return new Promise(()=>{},()=>{}); }

	delete(tableName, clones){ return new Promise(()=>{},()=>{}); }

	insert(tableName, clones){ return new Promise(()=>{},()=>{}); }
}

class BaseORMDescriptor {
	constructor(implementor){
		if(new.target === BaseORMDescriptor)
			throw new Error("Can't instantiate abstract type.");

		if(!(implementor instanceof BaseDBImplementor))
			throw new Error("Invalid argument 'implementor'.");

		this.implementor = implementor;
	}

	selectAll(){
		throw new Error("Not implemented.");
	}

	updateAll(items){
		throw new Error("Not implemented.");
	}

	deleteAll(items){
		throw new Error("Not implemented.");
	}

	insertAll(items){
		throw new Error("Not implemented.");
	}
}

class ORMDescriptor extends BaseORMDescriptor {
	constructor(implementor){
		super(implementor);
	}

	selectAll(tableName){
		return this.implementor.select(tableName);
	}

	updateAll(table, items){
		const clones = items.map(item => JSON.stringify(item));
		return this.implementor.update(table, clones);
	}

	deleteAll(table, items){
		const clones = items.map(item => JSON.stringify(item));
		return this.implementor.update(table, clones);
	}

	insertAll(table, items){
		const clones = items.map(item => JSON.stringify(item));
		return this.implementor.update(table, clones);
	}
}

class ORMDebugDescriptor extends BaseORMDescriptor {
	constructor(implementor){
		super(implementor);
	}

	itemToDebugJSON(item){
		item._debug = true;
		const result = JSON.stringify(item);
		delete item._debug;
		return result;
	}

	selectAll(tableName){
		return this.implementor.select(tableName);
	}

	updateAll(table, items){
		const clones = items.map(item => this.itemToDebugJSON(item));
		return this.implementor.update(table, clones);
	}

	deleteAll(table, items){
		const clones = items.map(item => this.itemToDebugJSON(item));
		return this.implementor.update(table, clones);
	}

	insertAll(table, items){
		const clones = items.map(item => this.itemToDebugJSON(item));
		return this.implementor.update(table, clones);
	}
}

module.exports = {
	DB1Implementor,
	DB2Implementor,
	ORMDescriptor,
	ORMDebugDescriptor
};