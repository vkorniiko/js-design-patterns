class BaseMediator {
	constructor(){
		if(new.target === BaseMediator)
			throw new Error("Can't instantiate abstract type.");
	}

	notify(event, target){
		throw new Error("Not implemented.");
	}
}

class BaseColleague {
	constructor(baseMediator){
		if(new.target === BaseColleague)
			throw new Error("Can't instantiate abstract type.");

		if(!(baseMediator instanceof BaseMediator))
			throw new Error("Invalid argument 'baseMediator'.");

		this.mediator = baseMediator;
	}
}

class HelloMediator extends BaseMediator {
	constructor(){
		super();

		this.helloButton = new HelloButtonColleague(this);
		this.saveButton = new SaveButtonColleague(this);
		this.textField = new TextFieldColleague(this);
	}

	notify(event, target){
		switch(event){
			case "helloButtonClicked":
				this.setText("Hello!");
			break;
			case "textFieldChanged":
				this.refreshSaveButton();
			break;
		}
	}

	setText(text){
		this.textField.setText(text);
	}

	refreshSaveButton(){
		this.saveButton.enabled = this.textField.text !== "";
	}
}

class ButtonColleague extends BaseColleague {
	constructor(baseMediator){
		super(baseMediator);
		this.enabled = true;
	}
}

class HelloButtonColleague extends ButtonColleague {
	clickHandler(){
		this.mediator.notify("helloButtonClicked", this);
	}
}

class SaveButtonColleague extends ButtonColleague {
	
}

class TextFieldColleague extends BaseColleague {
	constructor(baseMediator){
		super(baseMediator);
		this.text = "";
	}

	setText(text){
		this.text = text;
		this.changedHandler();
	}

	changedHandler(){
		this.mediator.notify("textFieldChanged", this);
	}
}

module.exports = {
	BaseMediator,
	BaseColleague,
	HelloMediator,
	ButtonColleague,
	HelloButtonColleague,
	SaveButtonColleague,
	TextFieldColleague
};