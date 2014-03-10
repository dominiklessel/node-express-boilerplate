
/**
 * Export
 */

var repeatString = function( pattern, count ) {
  if ( count < 1 ) {
    return '';
  }
  var result = '';
  while ( count > 0 ) {
    if (count & 1) result += pattern;
    count >>= 1, pattern += pattern;
  }
  return result;
};

module.exports = function() {
  var line = [
    '#',
    'node-express-boilerplate',
    'v.' + nconf.get('App:Version') ? nconf.get('App:Version') : 'X.X.X',
    '#'
  ].join(' ');
  console.log();
  console.log( repeatString( '#', line.length ) );
  console.log( line );
  console.log( repeatString( '#', line.length ) );
  console.log();
};
