'use strict';

// This section will initalize all data from the CSV
// in ./data/cu.txt to Mongo (or your configured database)
var mongoose = require('mongoose');
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

var initApi = function(req, res){
  // Put these in config
  var filePath = "../data/cu.txt";
  var collectionName = 'credit_unions';

  var db = mongoose.connection.db;
  db.createCollection(collectionName, {strict: true}, function(err, collection){
    if (err){
      // Just log if this errors
      // Non critical for init
      console.log(err);
      res('Data initialize already completed!');
    }else {
      readFile(filePath, function(err, rows){
        var data = rows;
        // TODO
        // Add data
        db.collection('credit_unions').insert(data, {}, function(err, records){
          if (err) throw err;
          res('Done!');
        });
      });
    }
  });
};

var routes = {
  method: 'GET',
  path: '/init',
  handler: initApi
};

module.exports = routes; 
