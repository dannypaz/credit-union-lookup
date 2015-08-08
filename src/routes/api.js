'use strict'

var fs = require('fs');
var path = require('path');

var readFile = function(filePath, cb){
  var response = [];

  // Open the file and iterate through lines to prettify
  // push lines to response and return

  cb(response);
};

var getApi = function(req,res){
  var filePath = "../../data/cu.txt";
  var response = readFile(filePath, function(data){
    //write the output to screen in pretty way
  });
};

var routes = {
  method: 'GET',
  path: '/api',
  handler: getApi
};

module.exports = routes; 


// def csv_writer(data, path):
//   with open(path, "wb") as csv_file:
//     writer = csv.writer(csv_file, delimiter=',')
//     for line in data:
//       writer.writerow(line)

// if __name__ == "__main__":
//   count = 0
//   response = []

//   f = open('./cu.txt')
//   for line in f:
//     #iterate line count to find first line
//     count += 1
//     if count is not 1:
//       s = line.split(',')

//       #Remove quotations and normalize CEO name for CU
//       ceoData = s[7] + s[6]
//       ceoName = ceoData.replace('""', ' ')

//       #Remove escape from string and normalize
//       cuName = s[1].replace('"', "")
//       cuZipcode = s[5].replace('"', "")

//       response.append([cuName, cuZipcode, ceoName])
//     else:
//       response.append(['cu_name', 'zip_code', 'ceo_name'])


//   path = "cu-output.csv"
//   csv_writer(response, path)
