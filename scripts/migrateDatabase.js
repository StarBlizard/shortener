const cwd       = process.cwd();
const { join }  = require('path');
const srequire  = require('srequire');
const Sequelize = require('sequelize');
const { spawn } = require('child_process');

const Logger = srequire('logger');

const dbstatus     = join(cwd, 'common/dbstatus.json');
const sequelizeCli = join(cwd, 'node_modules/sequelize-cli/lib/sequelize').replace(/\\/g, '/');

module.exports = function(env) {
  return new Promise( resolve => {
    const migrate = spawn(`node ${ sequelizeCli } db:migrate`, [], { shell: true, env });

    migrate.stdout.on('data', data => {
      if ((data + '') != '\n') {
        Logger.info(`${data}`);
      }
    });

    migrate.stderr.on('data', data => {
      if (data + '') { Logger.error(`${data}`, sequelizeCli); }
    });

    migrate.on('close', code => {
      resolve(code);
    });
  });
};
