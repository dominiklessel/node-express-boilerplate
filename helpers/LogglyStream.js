
/**
 * Module dependencies.
 */

var request = require('request');
var util = require('util');
var endpoint = util.format( '%stag/matching-%s,%s/', nconf.get('Services:Loggly:Endpoint'), process.env.APP_CLIENT, process.env.NODE_ENV );

/**
 * Logger
 */

var LogglyStream = function() {};

LogglyStream.prototype.write = function( record ) {

  if ( 'object' !== typeof(record) ) {
    console.log( 'LogglyStream Error - RecordType:' );
    console.dir( record );
    return;
  }

  request({ method: 'POST', uri: endpoint, json: record }, function( err, response, body ) {
    if ( err ) {
      console.log( 'LogglyStream Error - Request:' );
      console.dir( err );
    }
  });

};

/**
 * Export
 */

module.exports = LogglyStream;
