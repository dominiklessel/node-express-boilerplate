
/**
 * Base controller
 */

var indentifier = 'root';

var getIndex = function( req, res ) {
  var pageTitle = res.lingua.content.sites[indentifier].title;
  res.render( indentifier + '/index', {
    'pageTitle' : pageTitle
  });
};

exports.setup = function ( app ) {
  app.get( '/', getIndex );
};
