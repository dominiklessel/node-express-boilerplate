
/**
 * Module dependencies.
 */

var path    = require('path');

var express = require('express'),
    lingua  = require('lingua'),
    stylus  = require('stylus'),
    bunyan  = require('bunyan');

    nconf   = require('nconf'); // note: global

/**
 * Logging
 */

var logger = function( req, res, next ) {
  var AccessLog = bunyan.createLogger({
    name    : 'AccessLog',
    streams : [{
      path  : path.join( __dirname, 'logs', 'access.log' )
    }],
    serializers: {
      req : bunyan.stdSerializers.req
    }
  });
  AccessLog.info({
    req : req
  });
  next();
};

log = bunyan.createLogger({ // global
  name    : 'CustomLog',
  streams : [{
    path  : path.join( __dirname, 'logs', 'custom.log' )
  }]
});

/**
 * App setup
 */

var app = express();

// Enviroment setup
require( __dirname + '/config/enviroment.js' )(
  path,
  express,
  app,
  logger,
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

if ( !module.parent ) {
  app.listen( app.get('port') );
  console.log( 'Express server listening on port %s', app.get('port') );
}
