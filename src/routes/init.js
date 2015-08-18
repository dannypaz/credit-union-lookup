'use strict';

// This section will initalize all data from the CSV
// in ./data/cu.txt to Mongo (or your configured database)
var fs = require('fs');
var parse = require('csv-parse');

var readFile = function(path, callback){
  var response = [];

  var parser = parse({ delimiter: ',' }, function(err, data){
    // Grab and then normalize
    var ceoData = data[7] + data[6];
    var ceoName = ceoData.replace('""', ' ');

    var cuName = data[1].replace('"', ' ');
    var cuZipcode = data[5].replace('"', "");

    response.push({
      ceo_name: ceoName,
      cu_name: cuName,
      cu_zipcode: cuZipcode
    });
  });

  fs.createReadStream(filePath).pipe(parser, function(){
    callback(response);
  });

};

var initApi = function(req,res){
  //read file
  var filePath = "../data/cu.txt";

  readFile(filePath, function(err, res){
    var data = res; // This is array prettyfied

    // TODO
    // Add data
    var db = req.server.plugins['hapi-mongodb'].db;

    res('Done!');
  });
};

var routes = {
  method: 'GET',
  path: '/api/init',
  handler: initApi
};

module.exports = routes; 
