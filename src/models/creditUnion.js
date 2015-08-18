'use strict';

var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;


var creditUnionSchema = new Schema({
  ceo_name      : { type: String, trim: true },
  cu_name       : { type: String, required: true, trim: true },
  cu_zipcode    : { type: String, trim: true },
  cu_asset_size : { type: String, required: true, trim: true }
});

var creditUnion = Mongoose.model('credit_union', creditUnionSchema);

module.exports = {
  CreditUnion: creditUnion
};
