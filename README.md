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

## Asset management

[jam.js](https://github.com/caolan/jam) is used for asset management, but still has a bug, which forces you to fix paths inside `require.config.js` and `require.js` manually.

## CDN using *express-cdn*

To use a CDN, just update your configuration files, uncomment line 36 - 39 in `app.js` and use the CDN helper inside your views.

For mor information take a look at the [express-cdn docs](https://github.com/niftylettuce/express-cdn).

## Module dependencies

- express (v3.0.0)
- [express-cdn](https://github.com/niftylettuce/express-cdn) (v0.0.8)
- nconf (v0.6.4)
- jog (v0.5.1)
- jade (v0.27.6)
- stylus (v0.30.1)
- lingua (v0.3.2)