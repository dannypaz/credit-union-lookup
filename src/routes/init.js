'use strict';

// This section will initalize all data from the CSV
// in ./data/cu.txt to Mongo (or your configured database)
var fs = require('fs');
var parse = require('csv-parse');

var readFile = function(path, callback){
  var response = [];
  var skipFirstLine = true;
  var parseOptions = {
    delimiter: ',',
    newline: '\n'
  };
  var parser = parse(parseOptions, function(err, data){
    if (skipFirstLine === true){
      skipFirstLine = false;
    }else {
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
    }
  });

  var reader = fs.createReadStream(filePath).pipe(parser);
  reader.on('end', function(){
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
    db.collection('credit_unions').insert(data, {}, function(err, records){
      if (err) throw err;
      res('Done!');
    });
  });
};

var routes = {
  method: 'GET',
  path: '/api/init',
  handler: initApi
};

module.exports = routes; 
