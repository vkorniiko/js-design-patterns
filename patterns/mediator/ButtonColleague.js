"use strict";

const BaseColleague = require("./BaseColleague");

class ButtonColleague extends BaseColleague {
  constructor(baseMediator) {
    super(baseMediator);
    this.enabled = true;
  }
}

module.exports = ButtonColleague;
