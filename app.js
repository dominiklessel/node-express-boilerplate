
/**
 * Some check
 */

if ( !process.env.NODE_ENV ) {
  process.env.NODE_ENV = 'development';
}

/**
 * Module dependencies.
 */

var path    = require('path');
var fs      = require('fs-extra');
var express = require('express');
var bunyan  = require('bunyan');

/**
 * Global utilities
 */

_     = require('lodash');
async = require('async');
nconf = require('nconf').file( path.join(__dirname,'config',process.env.NODE_ENV+'.json') );

/**
 * Helper
 */

var Header = require( path.join(__dirname, 'helpers', 'Header') );
var LogglyStream = require( path.join(__dirname, 'helpers', 'LogglyStream') );
var Enviroment = require( path.join(__dirname, 'config', 'enviroment') );
var Middleware = require( path.join(__dirname, 'middleware') );

/**
 * Logging
 */

log = bunyan.createLogger({
  name: 'EventLogger',
  serializers: {
    req: bunyan.stdSerializers.req,
    res: bunyan.stdSerializers.res
  },
  streams: [
    { type: 'raw', level: 'info', stream: new LogglyStream() },
    { path: path.join( __dirname, 'logs', process.env.NODE_ENV + '-' + nconf.get('App:Name') + '-events.log' ) }
  ]
});

reqLog = bunyan.createLogger({
  name: 'RequestLogger',
  serializers: {
    req: bunyan.stdSerializers.req,
    res: bunyan.stdSerializers.res
  },
  streams: [
    { type: 'raw', level: 'info', stream: new LogglyStream() },
    { path: path.join( __dirname, 'logs', process.env.NODE_ENV + '-' + nconf.get('App:Name') + '-requests.log' ) }
  ]
});

/**
 * App setup
 */

var app = express();

async.series([Enviroment.bind(app), Middleware.bind(app)], function( err, results ) {
  Header();
  if ( err ) {
    console.log( 'Error:' );
    console.log();
    console.dir( err );
    return;
  }
  app.listen( nconf.get('App:Port'), function() {
    console.log(' - Server listening to Port %s', nconf.get('App:Port') );
  });
});
