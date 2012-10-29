
/**
 * Module dependencies.
 */

var express = require('express');
var http    = require('http');
var path    = require('path');
var lingua  = require('lingua');
var stylus  = require('stylus');
var jog     = require('jog');
nconf       = require('nconf'); // note: global

/**
 * Logging
 */

log = jog(new jog.FileStore(path.join(__dirname, 'logs', 'app.log'))); // note: global

/**
 * App setup
 */

var app = express();

// Enviroment setup
require( __dirname + '/config/enviroment.js' )(
  path,
  express,
  app,
  stylus,
  lingua
);

// CDN setup
// require( __dirname + '/config/cdn.js' )(
//   path,
//   app
// );


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