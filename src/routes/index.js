'use strict';

var getIndex = function(req, res){
  res('<h1>Credit Union Search Tool</h1>');
};

var index = {
  method: 'GET',
  path: '/',
  handler: getIndex
};

module.exports = index; 
