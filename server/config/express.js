/**
 * Express configuration
 */

'use strict';

var express = require('express'),
    favicon = require ('serve-favicon'),
    morgan = require ('morgan'),
    compression = require ('compression'),
    bodyParser = require ('body-parser'),
    methodOverride = require ('method-override'),
    cookieParser = require ('cookie-parser'),
    path = require ('path'),
    config = require ('./environment'),
    passport = require('passport');

module.exports = function(app) {

  // app.use(favicon(path.join(config.root, 'client', 'favicon.ico')));

  app.set('appPath', path.join(config.root, 'client'));
  app.use(express.static(app.get('appPath')));
  app.use(morgan('dev'));

  app.set('views', config.root + '/server/views');
  app.engine('html', require('ejs').renderFile);
  app.set('view engine', 'html');
  app.use(compression());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(methodOverride());
  app.use(cookieParser());
  app.use(passport.initialize());

};
