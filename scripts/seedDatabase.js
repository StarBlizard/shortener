const { join }  = require('path');
const srequire  = require('srequire');
const Sequelize = require('sequelize');
const { spawn } = require('child_process');

const Logger = srequire('logger');

const cwd = process.cwd();

const dbstatus     = join(cwd, 'common/dbstatus.json');
const sequelizeCli = join(cwd, 'node_modules/sequelize-cli/lib/sequelize').replace(/\\/g, '/');

module.exports = function(env) {
  return new Promise( resolve => {
    Logger.info(`Starting Seeding`);
    const seed = spawn(`node ${sequelizeCli} db:seed:all`, [], { shell: true, env });

    seed.stdout.on('data', data => {
      if ((data + '') != '\n') {
        Logger.info(`${data}`);
      }
    });

    seed.stderr.on('data', data => {
      if (data + '') { Logger.error(`${data}`, sequelizeCli); }
    });

    seed.on('close', code => {
      resolve(code);
    });
  });
};
