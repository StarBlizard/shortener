const request       = require('request');
const srequire      = require('srequire');
const { url, PORT } = require('nconf').get('Server');

const ErrorHelper = srequire('error');
const Logger      = srequire('logger');

const {
  sites,
  webhooks,
  shortenedUrls
} = srequire('models');

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
    shortenedUrl = await shortenedUrls.getOne({ where: { id }, options: { paranoid: false } });

    if (shortenedUrl.get('deletedAt')) { throw new Error('Not Found'); }

    siteID = shortenedUrl.get('siteID');
  } catch (error) {
    if (!shortenedUrl) {
      return ErrorHelper.handleResponse(error, res);
    }

    const site = await sites.getOne({ where: { id: shortenedUrl.get('siteID') } });
    let notFoundUrl = site.get('notFound');

    if (notFoundUrl) {
			notFoundUrl.indexOf('http') > -1 || (notFoundUrl = `http://${ notFoundUrl }`);
      return res.redirect(notFoundUrl);
    } else {
      return res.send('Link Not Available');
    }
  }

  try {
    const webhook = await webhooks.getOne({ where: { siteID, type: 'CLICK' } });

    const serverPORT = PORT ? `:${ PORT }` : '';
    const shortened = `${ url }${ serverPORT }/get?id=${ shortenedUrl.get('id') }`;

    if (webhook.get('endpoint')) {
			let endpoint = webhook.get('endpoint');

			endpoint.indexOf('http') > -1 || (endpoint = `http://${ endpoint }`);

      const siteRequest = await new Promise( (resolve, reject) => {
        try {
          request.post({
            json: true,
            url : endpoint,
            body: { url: shortened }
          }, (error, response, body) => error ? reject(error) : resolve(body));
        } catch(error) {
          reject(error);
        }
      });
    }
  } catch (error) {
    if (error.message != 'Not Found') {
      Logger.error(url);
      Logger.error('GETTER ERROR: ', error);
    }
  }

  let URL = shortenedUrl.get('url');

  URL.indexOf('http') == -1 && (URL = `http://${ URL }`);

  res.redirect(URL);
};
