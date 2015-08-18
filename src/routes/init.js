'use strict';

// This section will initalize all data from the CSV
// in ./data/cu.txt to Mongo (or your configured database)
var mongoose = require('mongoose');
var path = require('path');
var parse = require('csv-parse');
var LineByLineReader = require('line-by-line');

var escapeString = function(str){
  var strCopy = str.replace('\"', "").replace('"', "");
  return strCopy;
};

var readFile = function(filePath, callback){
  var response = [];
  var firstLineExists = true;
  var parseOptions = {
    delimiter: ',',
    newline: '\n'
  };

  var parser = function(line){
    if (firstLineExists){
      firstLineExists = false;
    }else {
      // This spot is a mess due to file formatting from ICUA
      var splitLine = line.split(",");

      var ceoData = line[7].split(",");

      var cuName = escapeString(splitLine[1]),
          cuStreet = escapeString(splitLine[2]),
          cuCity = escapeString(splitLine[3]),
          cuState = escapeString(splitLine[4]),
          cuZipcode = escapeString(splitLine[5]),
          cuPhone = escapeString(splitLine[8]),
          cuAssets = escapeString(splitLine[9]);

      // Special case for CEO
      var ceoFirstName = escapeString(splitLine[7]),
          ceoLastName = escapeString(splitLine[6]);

      var cuCEO = ceoFirstName.trimLeft() + " " + ceoLastName;

      // Need to use model instead of array
      response.push({
        name: cuName,
        street: cuStreet,
        city: cuCity,
        state: cuState,
        zipcode: cuZipcode,
        ceo_name: cuCEO,
        phone_number: cuPhone,
        assets: cuAssets
      });
    }
  };

  var lr = new LineByLineReader(path.join(__dirname, filePath))
    .on('error', function(err){
      callback(err);
    })
    .on('line', parser)
    .on('end', function(){
      callback(false, response);
    });

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

        var data = rows;

        db.collection(collectionName).insert(data, {}, function(err, records){
          if (err) throw err;
          res(db.collection(collectionName).count());
        });
      });
    }
  });
};

var clearDb = function(req, res){
  var db = mongoose.connection.db;
  db.collection('credit_unions').remove();
  res('cleared collection');
};

var add = {
  method: 'GET',
  path: '/init',
  handler: initApi
};

var remove = {
  method: 'GET',
  path: '/cleardb',
  handler: clearDb
};

module.exports = {
  add: add,
  remove: remove
};
