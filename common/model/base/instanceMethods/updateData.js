module.exports = async function(data) {
  try {
    return this.update(data);
  } catch (error) {
    const err = new Error('PSQL Error');

    err.path = __filename;
    err.details = error;

    throw err;
  }
};
