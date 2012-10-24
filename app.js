
/**
 * Module dependencies.
 */

var express = require('express');
var http    = require('http');
var path    = require('path');
var lingua  = require('lingua');
var stylus  = require('stylus');
nconf       = require('nconf'); // note: global (missing var)

/**
 * App setup
 */

var app = express();
require( __dirname + '/config/enviroment.js' )(
  path,
  express,
  app,
  stylus,
  lingua
);

/**
 * Middleware setup
 */

var middlewareCollection = [
   'base'
].map(function( middlewareName ) {
  var middleware;
  middleware = require( './middleware/' + middlewareName );
  return middleware.setup( app );
});

/**
 * Server setup
 */

http.createServer(app).listen(app.get('port'), function(){
  console.log( 'Express server listening on port ' + app.get('port') );
});