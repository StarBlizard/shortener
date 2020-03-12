const srequire = require('srequire');

srequire.setBaseRoutes(require('../common/baseRoutes.json'));

const pm2      = require('pm2')
const { join } = require('path')

const Logger = srequire('logger');

const logFilePath = join(__dirname, 'common/logs/pm2.log');

let env;

if (process.env) {
  env          = process.env;
  env.NODE_ENV = 'production';
} else {
  env = { NODE_ENV: 'production' };
}

// Scripts
Logger.info(JSON.stringify(env, null, 2));

(async function() {
  pm2.connect(function(err) {
    if (err) {
      Logger.error(err)
      process.exit(2)
    }

    pm2.start({
      name  : 'Karplace',
      script: 'scripts/start.js',

      // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
      instances: 'max',
      autorestart: true,
      exec_mode: 'cluster',
      watch: true,
      ignore_watch : [ 'node_modules', 'common/logs' ],
      max_memory_restart: '1G',
      NODE_PORT: env.PORT,
      port: env.PORT,
      PORT: env.PORT,
      increment_var : 'PORT',
      env: { NODE_ENV: 'production' },
      env_production: { NODE_ENV: 'production' },
      cwd: process.cwd()
    }, (err, apps) => {
      if (err) { throw err }
      Logger.info('Karplace Online!');
    });
  });
})();
