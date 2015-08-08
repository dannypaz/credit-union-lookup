var Hapi = require('hapi');

var server = new Hapi.Server();

//Require routes
var home = require('./routes/index');
var assets = require('./routes/assets');
var state = require('./routes/state');
var memberCount = require('./routes/memberCount');

server.connection({
  port: 3000
});

// Routes
server.route(home);
server.route(memberCount);
server.route(state);
server.route(assets);

server.start(function () {
  console.log('Server running at:', server.info.uri);
});
