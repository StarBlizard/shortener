const srequire = require('srequire');

const ErrorHelper = srequire('error');
const { sites }   = srequire('models');

module.exports = async function (req, res) {
  const data = req.body;

  if (!data.id) {
    const error = new Error('Validation Error');

    error.path = __filename;
    error.details = new Error('An ID is required');

    return ErrorHelper.handleResponse(error, res);
  }

  let site;

  try {
    site = await sites.getOne({ where: { id: data.id } });
    site = await site.updateData(data);
  } catch (error) {
    return ErrorHelper.handleResponse(error, res);
  }

  res.send(site);
};

