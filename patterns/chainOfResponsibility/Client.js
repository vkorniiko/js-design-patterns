"use strict";

const AppendGUIDHandler = require("./AppendGUIDHandler");
const UpdateDateHandler = require("./UpdateDateHandler");
const DeleteIdHandler = require("./DeleteIdHandler");

class Client {
  constructor() {
    this.dataProcessChain =
      new DeleteIdHandler(new UpdateDateHandler(new AppendGUIDHandler(null)));
  }
  processData(data) {
    return this.dataProcessChain.process(data);
  }
}

module.exports = Client;
