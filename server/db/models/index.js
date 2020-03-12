const fs        = require('fs');
const path      = require('path');
const srequire  = require('srequire');
const Sequelize = require('sequelize');
const nconf     = require('nconf');

const loadMethods = srequire('common/model/loadMethods');

const basename = path.basename(module.filename);

const db = {};
let config = nconf.get('Database');

if (!config) {
  const env = process.env.NODE_ENV || 'development';

  nconf.argv().env().file({ file: path.join(process.cwd(), `common/config/env/${ env }.config.json`) });
  config = nconf.get('Database');
}

let sequelize;

if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
  config.connection.operatorAliases = srequire('common/operatorAliases');
  sequelize = new Sequelize(
    config.database, config.username, config.password, config.connection
  );
}

fs
  .readdirSync(__dirname)
  .filter(dir =>  dir.indexOf('.js') === -1)
  .forEach(dir => {
    const modelDir = path.join(__dirname, dir);
    const model = sequelize.import(modelDir);

    loadMethods(model, modelDir);

    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
