'use strict';

// This section will initalize all data from the CSV
// in ./data/cu.txt to Mongo (or your configured database)
var mongoose = require('mongoose');
var fs = require('fs');
var path = require('path');
var parse = require('csv-parse');

var readFile = function(filePath, callback){
  var response = [];
  var firstLineExists = true;
  var parseOptions = {
    delimiter: ',',
    newline: '\n'
  };

  var parser = parse(parseOptions, function(err, data){
    if (data){
      for(var i=0;i<data.length;i++){
        if (firstLineExists){
          firstLineExists = false;
          continue;
        }else {
          console.log('Process the line');
          // Grab and then normalize
          var ceoData = data[i][6].split(",");
          var ceoName = ceoData[1].trimLeft() + " " + ceoData[0];

          var cuName = data[i][1];
          var cuZipcode = data[i][5];

          response.push({
            ceo_name: ceoName,
            cu_name: cuName,
            cu_zipcode: cuZipcode
          });
        }
      }
    }
  });

  try{
    var reader = fs.createReadStream(path.join(__dirname, filePath)).pipe(parser);
    reader.on('end', function(){
      callback(false, response);
    });
    reader.on('error', function(){
      // Need to find another way to handle this
      callback(true);
    });
  } catch(err){
    console.log(err);
  }
  
};

var initApi = function(req, res){
  // Put these in config
  var filePath = "../data/cu.txt";
  var collectionName = 'credit_unions';

  var db = mongoose.connection.db;
  db.createCollection(collectionName, {strict: true}, function(err, collection){
    if (err === "banana"){
      // Just log if this errors
      // Non critical for init
      console.log(err);
      res('Data initialize already completed!');
    }else {
      readFile(filePath, function(err, rows){
        if (err) throw err;

        var data = {
          success: true,
          filter: "none",
          data: rows
        };
        res(data);
        // TODO
        // Add data
        // db.collection('credit_unions').insert(data, {}, function(err, records){
        //   if (err) throw err;
        //   res('Done!');
        // });
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
