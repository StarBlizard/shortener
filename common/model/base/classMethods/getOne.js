const srequire            = require('srequire');
const processFetchOptions = srequire('common/model/processFetchOptions');

module.exports = async function(data, paranoid) {
  const options = processFetchOptions(data, paranoid);
  let result;

  try {
    result = await this.findOne(options);
  } catch (error) {
    const err = new Error('PSQL Error');

    err.path = __filename;
    err.details = error;

    throw err;
  }

  if (!result) {
    const error = new Error('Not Found');

    error.path = __filename;
    error.details = new Error('No results found');

    throw error;
  }

  return result;
};
