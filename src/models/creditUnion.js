'use strict';

// Not in use until additional routes

var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var creditUnionSchema = new Schema({
  name            : { type: String, required: true, trim: true },
  street          : { type: String, trim: true },
  city            : { type: String, trim: true },
  state           : { type: String, required: true, trim: true },
  zipcode         : { type: String, required: true, trim: true },
  ceo_name        : { type: String, trim: true },
  phone_number    : { type: String, trim: true },
  assets          : { type: String, trim: true }
});

var creditUnion = Mongoose.model('credit_union', creditUnionSchema);

module.exports = {
  CreditUnion: creditUnion
};
