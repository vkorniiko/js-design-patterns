"use strict";

const BaseDataHandler = require("./BaseDataHandler");

class DeleteIdHandler extends BaseDataHandler {
  process(data) {
    data.id = null;
    super.process(data);
  }
}

module.exports = DeleteIdHandler;
