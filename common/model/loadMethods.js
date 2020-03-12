const fs       = require('fs');
const { join } = require('path');

module.exports = function(model, dir) {
  const classMethods    = join(dir, '/classMethods/');
  const instanceMethods = join(dir, '/instanceMethods/');

  model.getOne   = require('./base/classMethods/getOne');
  model.getAll   = require('./base/classMethods/getAll');
  model.generate = require('./base/classMethods/generate');

  model.prototype.remove     = require('./base/instanceMethods/remove');
  model.prototype.updateData = require('./base/instanceMethods/updateData');

  if (fs.existsSync(classMethods)) {
    fs
      .readdirSync(classMethods)
      .filter(file =>
        file.indexOf('~')    === -1 &&
        file.indexOf('.swp') === -1 &&
        file[file.length - 3] === '.')
      .forEach( methodFile => {
        const methodName = methodFile.replace('.js', '');

        model[methodName] = require(join(classMethods, methodFile));
      });
  }

  if (fs.existsSync(instanceMethods)) {
    fs
      .readdirSync(instanceMethods)
      .filter(file =>
        file.indexOf('~')    === -1 &&
        file.indexOf('.swp') === -1)
      .forEach( methodFile => {
        const methodName = methodFile.replace('.js', '');

        model.prototype[methodName] = require(join(instanceMethods, methodFile));
      });
  }
};
