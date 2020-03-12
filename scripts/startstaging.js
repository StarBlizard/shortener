const srequire = require('srequire');

srequire.setBaseRoutes(require('../common/baseRoutes.json'));

const pm2      = require('pm2');
const { join } = require('path');
const nconf    = require('nconf');

const Logger = srequire('logger');

const logFilePath = join(process.cwd(), 'common/logs/pm2.log');

let env;

if (process.env) {
  env          = process.env;
  env.NODE_ENV = 'staging';
} else {
  // Set the configuration file
  env.NODE_ENV = 'staging';
}

// Scripts
// Logger.info(JSON.stringify(env, null, 2));

(async function() {
  pm2.connect(function(err) {
    if (err) {
      Logger.error(err);
      process.exit(2);
    }

    pm2.start({
      name  : 'Karlo',
      script: 'scripts/start.js',

      // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
      instances         : 1,
      port              : 80,
      PORT              : 80,
      NODE_PORT         : 80,
      max_memory_restart: '1G',
      autorestart       : true,
      watch             : true,
      increment_var     : 'PORT',
      cwd               : process.cwd(),
      ignore_watch      : [ 'node_modules', 'common/logs' ],

      env        : { NODE_ENV: 'staging' },
      env_staging: { NODE_ENV: 'staging' }
    }, (err, apps) => {
      if (err) { throw err; }
      Logger.info('Karlo Online!');
    });
  });
})();
