'use strict';

// This will init all data from CSV to mongo

var cu_data = function(req,res){
  var db = req.server.plugins['hapi-mongodb'].db;

  // Add data
  res('Done!');
};

var routes = {
  method: 'GET',
  path: '/api/init',
  handler: getApi
};

module.exports = routes; 
