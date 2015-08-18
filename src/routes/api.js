'use strict';

var mongoose = require('mongoose');

var getCreditUnionData = function(req,res){
  // Need to convert this to model
  var db = mongoose.connection.db;
  var collectionName = 'credit_unions';

  var response = [];
  var stream = db.collection(collectionName).find().stream()
    .on('data', function(row){
      response.push(row);
    })
    .on('close', function(){
      res(response);
    });
};

var routes = {
  method: 'GET',
  path: '/api',
  handler: getCreditUnionData
};

module.exports = routes; 
