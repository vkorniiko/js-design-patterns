"use strict";

const BaseDataHandler = require("./BaseDataHandler");

class AppendGUIDHandler extends BaseDataHandler {
  guid() {
    /* eslint-disable no-magic-numbers */
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      const r = Math.random() * 16 | 0, v = c == "x" ? r : r & 0x3 | 0x8;
      return v.toString(16);
    });
    /* eslint-enable no-magic-numbers */
  }
  process(data) {
    data.guid = this.guid();
    super.process(data);
  }
}

module.exports = AppendGUIDHandler;
