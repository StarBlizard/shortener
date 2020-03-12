const moment = require('moment');
const _      = require('underscore');

const codes  = require('./codes');
const Logger = require('../logger');

const err = {
  stringify(obj, tabspace){
    tabspace || (tabspace = 1);
    return _.reduce(obj, (memo, value, key) => {
      if (_.isObject(value)) {
        value = this.stringify(value, tabspace + 1);
      }

      if (_.isString(value)) {
        value = value.replace(/(?:\r\n|\r|\n)/g, '\n' + '  '.repeat(tabspace + 1));
      }

      memo.string += `${ '  '.repeat(tabspace) + key }: ${ value }\n`;
      return memo;
    }, { string: '{\n', tabspace }).string + '}';
  },

  format(error) {
    const message = codes[error.message] ? error.message : 'Internal Server Error';
    const { code, description } = codes[message];
    const formatted = {
      message,
      code,
      description
    };

    error.path && (formatted.path = error.path);
    error.details && (formatted.details = error.details.stack);
    error.details || (formatted.details = error.stack);

    return formatted;
  },

  /*
   *  error: {
   *    message: [@string],
   *    name: [@string],
   *    path: [@string]
   *  }
   *  */
  handleResponse(error, res) {
    const response = this.format(error);

    Logger.error(this.stringify(response));

    if (res) {
      const status = response.code || 500;
      return res.status(status).send(response);
    }

    return response;
  }
};

module.exports = err;
