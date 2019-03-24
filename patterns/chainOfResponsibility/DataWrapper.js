"use strict";

class DataWrapper {
  constructor(id, payload, date) {
    this.id = id;
    this.guid = null;
    this.payload = payload;
    this.date = date;
  }
}

module.exports = DataWrapper;
