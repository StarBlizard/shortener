const moment  = require('moment');
const winston = require('winston');
const _       = require('underscore');
const env     = process.env.NODE_ENV || 'development';

const options = {
  file: {
    maxFiles        : 5,
    json            : true,
    timestamp       : true,
    handleExceptions: true,
    colorize        : false,
    level           : 'info',
    maxsize         : 5242880, // 5MB
    filename        : `${process.cwd()}/common/logs/app.log`
  },

  console: {
    handleExceptions: true,
    colorize        : true,
    timestamp       : true,
    json            : false,
    level           : 'debug'
  },

  console: {
    level   : 'error',
    filename: `${ process.cwd() }/common/logs/errors.log`
  }
};

let Logger;

if (env !== 'development') {
  Logger = winston.createLogger({
    exitOnError: false,

    format: winston.format.combine(
      winston.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
      }),

      winston.format.printf(info => {
        if (!info.message) { return; }
        return `[${ info.timestamp }] [${ info.level.toUpperCase() }]: ${ info.message }`;
      })
    ),

    transports: [
      new winston.transports.File(options.file),
      new winston.transports.Console(options.console)
    ]
  });

  Logger.stream = {
    write: function(message) {
      Logger.info(message);
    }
  };

} else {
  Logger = {
    info : function(message) {
      const hour = moment().format('HH:mm:ss');

      console.log(`[INFO] ${ hour }: ${ message }`);
    },

    error : function(message) {
      const hour = moment().format('HH:mm:ss');

      console.log(`[ERROR] ${ hour }: ${ message }`);
    }
  };
}

module.exports.info = function() {
  const data = _.map(arguments, arg =>
    arg instanceof Error ? arg.stack                    :
    _.isObject(arg)      ? JSON.stringify(arg, null, 2) :
    arg
  );

  Logger.info.call(Logger, data.join(' '));
  return module.exports;
};

module.exports.error = function() {
  const data = _.map(arguments, arg =>
    arg instanceof Error ? arg.stack                    :
    _.isObject(arg)      ? JSON.stringify(arg, null, 2) :
    arg
  );

  Logger.error.call(Logger, data.join(' '));
  return module.exports;
};
