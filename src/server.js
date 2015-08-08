var Hapi = require('hapi');
var Good = require('good');
var config = require('./config/constants');

var server = new Hapi.Server();

server.connection({
  port: 3000
});

var home = require('./routes/index');
var assets = require('./routes/assets');
var state = require('./routes/state');
var memberCount = require('./routes/memberCount');

server.route(home);
server.route(memberCount);
server.route(state);
server.route(assets);

var goodConfig = {
  register: Good,
  options: {
    reporters: [{
      reporter: require('good-console'),
      events: {
        response: '*',
        log: '*'
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

