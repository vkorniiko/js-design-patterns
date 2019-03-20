class BaseMediator {
	constructor(){
		if(new.target === BaseMediator)
			throw new Error("Can't instantiate abstract type.");
	}

	notify(event, target){
		throw new Error("Not implemented.");
	}
}

class BaseCollegue {
	constructor(baseMediator){
		if(new.target === BaseCollegue)
			throw new Error("Can't instantiate abstract type.");

		if(!(baseMediator instanceof BaseMediator))
			throw new Error("Invalid argument 'baseMediator'.");

		this.mediator = baseMediator;
	}
}

class HelloMediator extends BaseMediator {
	constructor(){
		super();

		this.helloButton = new HelloButtonCollegue(this);
		this.saveButton = new SaveButtonCollegue(this);
		this.textField = new TextFieldCollegue(this);
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

class ButtonCollegue extends BaseCollegue {
	constructor(baseMediator){
		super(baseMediator);
		this.enabled = true;
	}
}

class HelloButtonCollegue extends ButtonCollegue {
	clickHandler(){
		this.mediator.notify("helloButtonClicked", this);
	}
}

class SaveButtonCollegue extends ButtonCollegue {
	
}

class TextFieldCollegue extends BaseCollegue {
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
	BaseCollegue,
	HelloMediator,
	ButtonCollegue,
	HelloButtonCollegue,
	SaveButtonCollegue,
	TextFieldCollegue
};