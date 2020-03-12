module.exports = async function(options) {
  try {
    return this.destroy(options);
  } catch (error) {
    const err = new Error('PSQL Error');

    err.path = __filename;
    err.details = error;

    throw err;
  }
};
