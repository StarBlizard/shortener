const helmet       = require('helmet');
const morgan       = require('morgan');
const express      = require('express');
const srequire     = require('srequire');
const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');

const errors   = srequire('error');
const Logger   = srequire('logger');
const router   = srequire('api/router');

// Set up the express app
const app = express();

const env = process.env.NODE_ENV || 'development';

if (env !== 'development') {
  // Log requests to the console.
  app.use(morgan('combined', { stream: Logger.stream }));
  Logger.info(`Environment = ${env}`);
}

// cors
app.use((req, res, next) => {
  if (req.method === 'GET' && req.url == '/alive') {
    res.status(200).send('alive');
  } else {
    next();
  }
});

// Parse incoming requests data
app.use(cookieParser());
app.use(bodyParser.json({ limit: '5mb' }));
app.use(helmet());
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Access-Control-Expose-Headers', 'authorization');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  if (req.method === 'OPTIONS') {
    res.send(200);
  } else {
    next();
  }
});

app.use(bodyParser.raw({
  inflate: true,
  limit: '100kb',
  type: 'application/octet-stream'
}));

router(app);

// Setup a default catch-all route that sends back a welcome message in JSON format.
app.get('*', (req, res) => res.status(200).send({
  message: `Welcome to Karlo Backend.\nEnvironment: ${ env }!!`
}));

app.use((req, res, next) => {
  if (req.status < 200 || req.status > 299) {
    const err = new Error('Not Found');

    err.status = req.status || 404;
    return errors.handleResponse(err);
  }

  next();
});

Logger.info('Server started');

module.exports = app;
