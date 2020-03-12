const srequire     = require('srequire');
const ServerConfig = require('nconf').get('Server');

const URL  = ServerConfig.url;
const PORT = ServerConfig.PORT;

const ErrorHelper = srequire('error');
const { sites, shortenedUrls } = srequire('models');

module.exports = async function (req, res) {
  const { siteID, url } = req.body;

  if (!siteID || !url) {
    const error = new Error('Validation Error');

    error.path = __filename;
    error.details = new Error('A siteID and a url are needed on the body');

    return ErrorHelper.handleResponse(error, res);
  }

  try {
    const site = await sites.getOne({ where: { id: siteID } });
    const shortenedUrl = await shortenedUrls.generate({ url, siteID });

    const serverPORT = PORT ? `:${ PORT }` : '';
    const result = `${ URL }${ serverPORT }/get?id=${ shortenedUrl.get('id') }`;

    res.send({ url: result });
  } catch (error) {
    return ErrorHelper.handleResponse(error, res);
  }
};
