'use strict';

var Hapi = require('hapi');
var Good = require('good');
var config = require('./config/constants');

var server = new Hapi.Server();

server.connection({
  port: 3000
});

var home = require('./routes/index');
var api = require('./routes/api');

server.route(home);
server.route(api);

var goodConfig = {
  register: Good,
  options: {
    reporters: [{
      reporter: require('good-console'),
      events: {
        response: '*',
        log: '*',
        error: '*',
        request: '*'
      }
    }]
  }
};

server.register(goodConfig, function (err) {
  if (err) {
    throw err; // couldn't load plugin
  }

  server.start(function () {
    console.log('Server running at:', server.info.uri);
  });
});
