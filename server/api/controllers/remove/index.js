const request       = require('request');
const srequire      = require('srequire');
const { url, PORT } = require('nconf').get('Server');

const ErrorHelper = srequire('error');
const Logger      = srequire('logger');

const { shortenedUrls } = srequire('models');

module.exports = async function (req, res) {
  const { id, siteID } = req.body;

  if (!id || !siteID) {
    const error = new Error('Validation Error');

    error.path = __filename;
    error.details = new Error('An ID and a siteID are required');

    return ErrorHelper.handleResponse(error, res);
  }

  let shortenedUrl;

  try {
    shortenedUrl = await shortenedUrls.getOne({ where: { id, siteID } });
    shortenedUrl = await shortenedUrl.remove();
  } catch (error) {
    return ErrorHelper.handleResponse(error, res);
  }

  res.send({ status: 'ok' });
};
