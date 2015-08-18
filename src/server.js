'use strict';

var Hapi = require('hapi');
var config = require('./config/config');

var server = new Hapi.Server();

server.connection({
  port: 3000
});

var home = require('./routes/index');
var api = require('./routes/api');
var init = require('./routes/init');

server.route(home);
server.route(api);
server.route(init);

var serverConfig = [
  config.good,
  config.mongo
];

server.register(serverConfig, function (err) {
  if (err) throw err; // Couldn't load

  server.start(function () {
    console.log('Server running at:', server.info.uri);
  });
});
