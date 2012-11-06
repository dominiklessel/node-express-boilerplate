module.exports = function( path, express, app, stylus, lingua ) {
  
  var compileStylus = function( str, path ) {
    return stylus( str )
      .set( 'filename', path )
      .set( 'compress', true );
  };

  app.configure('production', function() {
    nconf.file({ file: path.join(__dirname, 'production.json') });
  });

  app.configure('development', function() {
    nconf.file({ file: path.join(__dirname, 'development.json') });
  });

  app.configure(function(){
    app.set( 'views', path.join(__dirname, '..', 'views') );
    app.set( 'view engine', 'jade' );
    app.use( lingua(app, { defaultLocale: 'en', path: path.join(__dirname, '..', 'i18n') }) );
    app.use( express.favicon() );
    app.use( express.logger('dev') );
    app.use( express.bodyParser() );
    app.use( express.methodOverride() );
    app.use( express.cookieParser(nconf.get('App:CookieSecret')) );
    app.use( app.router );
    app.use( express.compress() );
    app.use( stylus.middleware({ src: path.join(__dirname, '..', 'public'), compile: compileStylus }) );
    app.use( express.static(path.join(__dirname, '..', 'public')) );
  });

  app.configure('development', function() {
    app.set( 'port', nconf.get('App:Port') );

    // error handling
    app.use( express.errorHandler() );

    // 404 handling
    // -> done by express

  });

  app.configure('production', function() {
    app.set( 'port', nconf.get('App:Port') );

    // error handling
    app.use(function( err, req, res, next ) {
      console.error( err.stack );
      res.send( 500, 'Something bad happend!' );
    });

    // 404 handling
    app.use(function( req, res ) {
      res.send( 404 );
    });

  });

};