
/**
 * Base controller
 */

var indentifier = 'base';

var getIndex = function( req, res ) {
  var pageTitle = res.lingua.content.sites[indentifier].title;
  res.render('base/index', {
    'pageTitle' : pageTitle
  });
};

exports.setup = function ( app ) {
  app.get( '/', getIndex );
};