const request       = require('request');
const srequire      = require('srequire');
const { url, PORT } = require('nconf').get('Server');

const ErrorHelper = srequire('error');
const Logger      = srequire('logger');
const { webhooks, shortenedUrls } = srequire('models');

module.exports = async function (req, res) {
  const { id } = req.query;

  if (!id) {
    const error = new Error('Validation Error');

    error.path = __filename;
    error.details = new Error('Invalid Url');

    return ErrorHelper.handleResponse(error, res);
  }

  let shortenedUrl;
  let siteID;

  try {
    shortenedUrl = await shortenedUrls.getOne({ where: { id } });
    siteID = shortenedUrl.get('siteID');
  } catch (error) {
    return ErrorHelper.handleResponse(error, res);
  }

  try {
    const webhook = await webhooks.getOne({ where: { siteID, type: 'CLICK' } });

    const serverPORT = PORT ? `:${ PORT }` : '';
    const shortened = `${ url }${ serverPORT }/get?id=${ shortenedUrl.get('id') }`;

    if (webhook.get('endpoint')) {
      const siteRequest = await new Promise( (resolve, reject) => {
        try {
          request.post({
            json: true,
            body: { url: shortened },
            url : webhook.get('endpoint')
          }, (error, response, body) => error ? reject(error) : resolve(body));
        } catch(error) {
          reject(error);
        }
      });
    }
  } catch (error) {
    if (error.message == 'Not Found') {
      Logger.error(url);
      Logger.error('GETTER ERROR: ', error);
    }

    res.send('Url Not Available');
  }

  let URL = shortenedUrl.get('url');

  URL.indexOf('http') == -1 && (URL = `http://${ URL }`);

  res.redirect(URL);
};
