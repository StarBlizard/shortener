const srequire = require('srequire');

const get        = srequire('controllers/get');
const shortUrl   = srequire('controllers/short');
const removeUrl  = srequire('controllers/remove');
const setWebhook = srequire('controllers/webhook');

module.exports = function(app) {
  app.get('/get', get);

  app.post('/short'     , shortUrl);
  app.post('/remove'    , removeUrl);
  app.post('/setWebhook', setWebhook);
};
