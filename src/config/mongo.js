'use strict';

var HapiMongo = require('hapi-mongodb');

module.exports = {
  register: HapiMongo,
  options: {
    url: "mongodb://localhost:27017/test",
    settings: {
      db: {
        native_parser: false
      }
    }
  }
};
