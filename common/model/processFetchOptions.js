const path      = require('path');
const sequelize = require('sequelize');
const _         = require('underscore');

const { Op } = sequelize;

/*
 *  data: {
 *    where: { a: 5, b: { $like: '%pepe%' }, c: { $gt: x, $lt: y } },
 *    pagination: { page: x, perPage: y, order: ['a', 'ASC'] },
 *    options: {
 *      extra stuff...
 *    },
 *
 *    modelA: { where: {...}, pagination: {...}, options: {...}, modelC: {pagination: ...., model: A} },
 *    modelB: { where: {...} },
 *    ...,
 *    modelN: { pagination: {...} }
 *  }
 */

function processFetchOptions(data, paranoid) {
  data || (data = {});

  let options = {};

  if (paranoid === false) { options.paranoid = paranoid; }
  if (_.isObject(data.where) === true) {
    options.where = data.where;
  }

  if (data.pagination) {
    const { pagination } = data;

    if (data.pagination.page + 1 && data.pagination.perPage + 1) {
      pagination.page    || (pagination.page = 0);
      pagination.perPage || (pagination.perPage = 20);

      options.offset = pagination.page * pagination.perPage;
    }

    options.order = pagination.order;
    options.limit = pagination.perPage;
  }

  if (data.options && data.options.random) {
    options.order || (options.order = []);
    options.order.push([sequelize.fn('RANDOM')]);
  }

  options = _.extend(options, data.options);
  const includes = _.omit(data, ['where', 'pagination', 'options']);

  if (!_.isEmpty(includes)) {
    options.include = [];
    const models = require(path.join(process.cwd(), 'server/db/models'));

    _.forEach(includes, (modelOptions, modelName) => {
      let includeOptions = processFetchOptions(modelOptions, paranoid);

      includeOptions.model = models[modelName];
      if (!includeOptions.model) {
        const error = new Error(`Model not found: ${ modelName }`);
        error.code = 400;
        throw error;
      }
      options.include.push(includeOptions);
    });
  }

  return options;
};

module.exports = processFetchOptions;
