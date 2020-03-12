module.exports = function(data) {
  try {
    return this.create(data);
  } catch (error) {
    const err = new Error('PSQL Error');

    err.path = __filename;
    err.details = error;

    throw err;
  }
};
