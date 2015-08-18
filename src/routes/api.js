'use strict';

var getCreditUnionData = function(req,res){
  var db = req.server.plugins['hapi-mongodb'].db;

  db.collection('credit_unions').findAll(function(err, rows){
    if (err) res.send('error');
    // return all data here
    res('done');
  });
};

var routes = {
  method: 'GET',
  path: '/api',
  handler: getCreditUnionData
};

module.exports = routes; 
