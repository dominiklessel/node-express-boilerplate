
/**
 * Module dependencies
 */

var express = require('express');

/**
 * Root controller
 */

var indentifier = 'root';
var router = express.Router();

/**
 * Route GET /
 */

router.get('/', function( req, res ) {
  var pageTitle = res.lingua.content.sites[indentifier].title;
  res.render( indentifier + '/index', {
    'pageTitle' : pageTitle
  });
});

/**
 * Export
 */

exports.setup = function ( app ) {
  app.use( '/', router );
};
