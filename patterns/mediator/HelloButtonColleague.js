"use strict";

const ButtonColleague = require("./ButtonColleague");

class HelloButtonColleague extends ButtonColleague {
  clickHandler() {
    this.mediator.notify("helloButtonClicked", this);
  }
}

module.exports = HelloButtonColleague;
