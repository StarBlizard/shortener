const srequire            = require('srequire');
const processFetchOptions = srequire('common/model/processFetchOptions');

module.exports = function(data, paranoid) {
  const options = processFetchOptions(data, paranoid);

  try {
    return this.findAll(options);
  } catch (error) {
    const err = new Error('PSQL Error');

    err.path = __filename;
    err.details = error;

    throw err;
  }
};
