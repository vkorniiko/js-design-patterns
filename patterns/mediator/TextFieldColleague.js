"use strict";

const BaseColleague = require("./BaseColleague");

class TextFieldColleague extends BaseColleague {
  constructor(baseMediator) {
    super(baseMediator);
    this.text = "";
  }

  setText(text) {
    this.text = text;
    this.changedHandler();
  }

  changedHandler() {
    this.mediator.notify("textFieldChanged", this);
  }
}

module.exports = TextFieldColleague;
