/* eslint consistent-return:0 */

const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const logger = require('./logger');
const argv = require('./argv');
const port = require('./port');
const setup = require('./middlewares/frontendMiddleware');
const isDev = process.env.NODE_ENV !== 'production';
const ngrok = (isDev && process.env.ENABLE_TUNNEL) || argv.tunnel ? require('ngrok') : false;
const resolve = require('path').resolve;
const app = express();
const ZAGGLE_ROOT_API = 'https://mobile-api.zaggle.in';

app.use(bodyParser.json({ limit: '1mb' }));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));

if (isDev) {
  app.use(morgan('dev'));
}

app.post('*', (req, res) => {
  const api = `${ZAGGLE_ROOT_API}${req.url}`;
  request.post(api, { formData: req.body }, (postErr, httpResponse, body) => {
    try {
      res.status(httpResponse ? httpResponse.statusCode || 200 : 200).json(JSON.parse(body));
    } catch (err) {
      logger.error(err);
      res.status(500).json({ success: false });
    }
  });
});

// In production we need to pass these values in instead of relying on webpack
setup(app, {
  outputPath: resolve(process.cwd(), 'build'),
  publicPath: '/',
});

// get the intended host and port number, use localhost and port 3000 if not provided
const customHost = argv.host || process.env.HOST;
const host = customHost || null; // Let http.Server use its default IPv6/4 host
const prettyHost = customHost || 'localhost';

// Start your app.
app.listen(port, host, (err) => {
  if (err) {
    return logger.error(err.message);
  }

  // Connect to ngrok in dev mode
  if (ngrok) {
    ngrok.connect(port, (innerErr, url) => {
      if (innerErr) {
        return logger.error(innerErr);
      }

      logger.appStarted(port, prettyHost, url);
    });
  } else {
    logger.appStarted(port, prettyHost);
  }
});
