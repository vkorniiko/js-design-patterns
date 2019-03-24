"use strict";

const BaseDataHandler = require("./BaseDataHandler");

class UpdateDateHandler extends BaseDataHandler {
  process(data) {
    data.date = new Date();
    super.process(data);
  }
}

module.exports = UpdateDateHandler;
