
/**
 * Export
 */

module.exports = function( req, res, next ) {

  if ( req.headers['user-agent'].indexOf('ELB-HealthChecker') > -1 ) {
    return next();
  }

  var sock = req.socket;

  req._startTime = new Date();
  req._remoteAddress = sock.socket ? sock.socket.remoteAddress : sock.remoteAddress;

  var logRequest = function() {
    res.removeListener('finish', logRequest);
    res.removeListener('close', logRequest);
    reqLog.info({
      req: req,
      res: res,
      responseTime: new Date() - req._startTime
    });
  };

  res.on('finish', logRequest);
  res.on('close', logRequest);

  next();

};
