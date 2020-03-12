const srequire = require('srequire');

const env    = process.env.NODE_ENV || 'development';
const CONFIG = srequire(`common/config/env/${env}.config.json`).Database;

module.exports = {
  database: CONFIG.database,
  username: CONFIG.username,
  password: CONFIG.password,

  host   : CONFIG.connection.host,
  dialect: CONFIG.connection.dialect,
  port   : CONFIG.connection.port || 5432
};
