'use strict';

const path = require('path');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('sites', [{
      id: 9999981,

      domain: 'localhost',
      ip    : '127.0.0.1',
      name  : 'Karbot Local',

      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('sites', null, {});
  }
};
