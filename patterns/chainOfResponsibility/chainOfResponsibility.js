class BaseDataHandler {
	constructor(successor){
		if(new.target === BaseDataHandler)
			throw new Error("Can't instantiate abstract type.");

		if(successor != null && !(successor instanceof BaseDataHandler))
			throw new Error("Invalid argument 'successor'.");

		this.handler = successor;
	}

	process(data){
		if(this.handler != null)
			this.handler.process(data);
	}
}

class DeleteIdHandler extends BaseDataHandler {
	process(data){
		data.id = null;
		super.process(data);
	}
}

class UpdateDateHandler extends BaseDataHandler {
	process(data){
		data.date = new Date();
		super.process(data);
	}
}

class AppendGUIDHandler extends BaseDataHandler {
	guid(){
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {var r = Math.random()*16|0,v=c=='x'?r:r&0x3|0x8;return v.toString(16);});
	}

	process(data){
		data.guid = this.guid();
		super.process(data);
	}
}

class DataWrapper {
	constructor(id, payload, date){
		this.id = id;
		this.guid = null;
		this.payload = payload;
		this.date = date;
	}
}

class Client {
	constructor(){
		this.dataProcessChain = 
			new DeleteIdHandler(
				new UpdateDateHandler(
					new AppendGUIDHandler()));
	}

	processData(data){
		return this.dataProcessChain.process(data);
	}
}

module.exports = {
	DataWrapper,
	DeleteIdHandler, 
	UpdateDateHandler,
	AppendGUIDHandler,
	Client
};