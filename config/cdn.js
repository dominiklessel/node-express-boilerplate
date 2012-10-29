module.exports = function( path, app ) {
  
  var options = {
    publicDir  : path.join(__dirname, '..', 'public'),
    viewsDir   : path.join(__dirname, '..', 'views'),
    
    ssl        : nconf.get('CDN:SSL'),
    domain     : nconf.get('CDN:Domain'),
    bucket     : nconf.get('CDN:Bucket'),

    key        : nconf.get('Services:AWS:Key'),
    secret     : nconf.get('Services:AWS:Secret'),

    hostname   : nconf.get('App:Host'),
    port       : nconf.get('App:Port'),
    
    production : nconf.get('Production')
  };

  var CDN = require('express-cdn')(app, options);

  app.locals({
    CDN : CDN()
  });

};