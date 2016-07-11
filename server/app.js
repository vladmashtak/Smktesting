/**
 * Main application file
 */

'use strict';
var http = require('http'),
    express = require('express'),
    mongoose = require('mongoose'),
    config = require('./config/environment');

mongoose.Promise = require('bluebird');

// Connect to MongoDB
mongoose.connect(config.mongo.uri, config.mongo.options);
mongoose.connection.on('error', function(err) {
  console.error('MongoDB connection error: ' + err);
});

// Populate databases with sample data
 require('./config/data');

// Setup server
var app = express();
var server = http.createServer(app);
require('./config/express')(app);
require('./routes')(app);

// Start server
function startServer() {
  app.angularFullstack = server.listen(config.port, config.ip, function() {
    console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
  });
}

setImmediate(startServer);

// Expose app
module.exports = app;
