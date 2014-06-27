
/**
 * Module dependencies.
 */

var path = require('path');
var express = require('express');
var stylus = require('stylus');

/**
 * Express middleware
 */


var lingua = require('lingua');

var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');
var compress = require('compression');

/**
 * Stylus
 */

var stylusMiddleware = function() {

  var compile = function( str, path ) {
    return stylus( str )
      .set( 'filename', path )
      .set( 'compress', true );
  };

  return stylus.middleware({
    src: path.join(__dirname, '..', 'public'),
    compile: compile
  });

};

/**
 * Configure express app
 */

var configureApp = function( app, callback ) {

  app.disable('x-powered-by');

  app.set( 'views', path.join(__dirname, '..', 'views') );
  app.set( 'view engine', 'jade' );

  app.use( lingua(app, { defaultLocale: 'de', path: path.join(__dirname, '..', 'i18n') }) );

  app.use( favicon( path.join(__dirname,'..','public','favicon.ico') ) );
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use( methodOverride() );
  app.use( cookieParser({keys:[nconf.get('App:CookieSecret')]}) );
  app.use( cookieSession(nconf.get('App:CookieSecret')) );
  app.use( stylusMiddleware() );
  app.use( compress() );

  // Static resources
  app.use( express.static(path.join(__dirname, '..', 'public')) );

  // Custom middleware
  app.use( require(path.join(__dirname, '..', 'middleware', 'logger')) );

  // Locals
  app.locals.env = process.env.NODE_ENV;
  app.locals.appVersion = nconf.get('App:Version');

  return callback( null, true );

};

/**
 * Export
 */

module.exports = function( callback ) {

  var app = this;

  configureApp( app, callback );

};
