module.exports = {
  apps : [{
    name  : 'Shortener',
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
    env_staging       : { NODE_ENV: 'staging' },
    ignore_watch      : [ 'node_modules', 'common/logs' ]
  }]
};
