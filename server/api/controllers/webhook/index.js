const srequire = require('srequire');

const ErrorHelper = srequire('error');
const { sites, webhooks } = srequire('models');

module.exports = async function (req, res) {
  const { siteID, endpoint } = req.body;

  if (!siteID || !endpoint) {
    const error = new Error('Validation Error');

    error.path = __filename;
    error.details = new Error('A siteID and an endpoint are needed on the body');

    return ErrorHelper.handleResponse(error, res);
  }

  let site;
  let webhook;

  try {
    site = await sites.getOne({ where: { id: siteID } });
  } catch (error) {
    return ErrorHelper.handleResponse(error, res);
  }

  try {
    webhook = await webhooks.getOne({ siteID });
    webhook = await webhook.updateData({ endpoint });
  } catch (error) {
    if (error.message != 'Not Found') { return ErrorHelper.handleResponse(error, res); }

    webhook = await webhooks.generate({ siteID, endpoint });
  }

    res.send(webhook);
};
