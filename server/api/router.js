const srequire = require('srequire');

const get        = srequire('controllers/get');
const shortUrl   = srequire('controllers/short');
const setWebhook = srequire('controllers/webhook');

module.exports = function(app) {
  app.post('/get'       , get);
  app.post('/short'     , shortUrl);
  app.post('/setWebhook', setWebhook);
};
