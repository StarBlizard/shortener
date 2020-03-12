const srequire = require('srequire');
const Logger    = srequire('logger');
const { spawn } = require('child_process');

module.exports = function(env) {
  Logger.info(`Starting Server`);
  const server = spawn('nodemon bin/www', [], { shell: true, env });

  server.stdout.on('data', (data) => {
    console.log(data + '');
  });

  server.stderr.on('data', (data) => {
    if (data + '') { console.error(`${data}`); }
  });

  server.on('close', code => {
    console.log(code);
  });

  return server;
};
