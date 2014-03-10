
/**
 * Module dependencies.
 */

var path = require('path');
var fs = require('fs-extra');

/**
 * Export
 */

module.exports = function( callback ) {

  var app = this;

  fs.readdirSync( __dirname ).forEach(function( file ) {
    if ( !fs.statSync( path.join(__dirname, file) ).isDirectory() ) {
      return null;
    }
    var middleware = require( path.join(__dirname,file) );
    middleware.setup( app );
  });

  return callback( null, true );

};
