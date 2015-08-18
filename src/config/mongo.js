'use strict';

var HapiMongooseDbConnector = require ('hapi-mongoose-db-connector');

module.exports = {
  register: HapiMongooseDbConnector,
  options: {
    mongodbUrl: "mongodb://localhost:27017/hapicreditunion",
  }
};
