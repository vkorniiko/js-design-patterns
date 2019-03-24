"use strict";

const BaseMediator = require("./BaseMediator");
const HelloButtonColleague = require("./HelloButtonColleague");
const SaveButtonColleague = require("./SaveButtonColleague");
const TextFieldColleague = require("./TextFieldColleague");

class HelloMediator extends BaseMediator {
  constructor() {
    super();
    this.helloButton = new HelloButtonColleague(this);
    this.saveButton = new SaveButtonColleague(this);
    this.textField = new TextFieldColleague(this);
  }

  notify(event, target) {/* eslint-disable-line no-unused-vars*/
    switch (event) {
      case "helloButtonClicked":
        this.setText("Hello!");
        break;
      case "textFieldChanged":
        this.refreshSaveButton();
        break;
    }
  }

  setText(text) {
    this.textField.setText(text);
  }

  refreshSaveButton() {
    this.saveButton.enabled = this.textField.text !== "";
  }
}

module.exports = HelloMediator;
