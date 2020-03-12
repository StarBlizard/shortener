const { join }  = require('path');
const srequire  = require('srequire');
const Sequelize = require('sequelize');
const { spawn } = require('child_process');

const Logger = srequire('logger');

const sequelizeCli = join(process.cwd(), '/node_modules/sequelize-cli/lib/sequelize').replace(/\\/g, '/');


module.exports = function(env) {
  return new Promise( resolve => {
    Logger.info(`Creating database`);
    const createDatabase = spawn(`node ${ sequelizeCli } db:create`, [], { shell: true, env });

    createDatabase.stdout.on('data', data => {
      if ((data + '') != '\n') {
        Logger.info(`${data}`);
      }
    });

    createDatabase.stderr.on('data', data => {
      if (data + '') { Logger.error(`${data}`, sequelizeCli); }
    });

    createDatabase.on('close', code => {
      resolve(code);
    });
  });
};
