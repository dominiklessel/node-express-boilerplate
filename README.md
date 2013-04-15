# express.js web boilerplate

This thing is far from perfect, but should give you a good starting point for your web site / app.

## Quick Start

Clone the boilerplate:
```
$ git clone git@github.com:dominiklessel/express-web-boilerplate.git my_web_app && cd my_web_app
```

Install dependencies:
```
$ npm install
```

Create logs folder
```
$ mkdir logs
```

Start the server:
```
$ node app
```

## CDN using *express-cdn*

To use a CDN, just update your configuration files, uncomment line 36 - 39 in `app.js` and use the CDN helper inside your views.

For more information take a look at the [express-cdn docs](https://github.com/niftylettuce/express-cdn).

## Modules used:

- [express](https://github.com/visionmedia/express)
- [express-cdn](https://github.com/niftylettuce/express-cdn)
- [nconf](https://github.com/flatiron/nconf)
- [jog](https://github.com/visionmedia/jog/)
- [jade](https://github.com/visionmedia/jade/)
- [stylus](http://learnboost.github.com/stylus/)
- [lingua](https://github.com/akoenig/express-lingua)