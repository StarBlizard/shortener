'use strict';

const path = require('path');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('webhooks', [{
      id: 9999981,

      type    : 'CLICK',
      endpoint: 'http://localhost:8000/api/shortener/webhook',

      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('webhooks', null, {});
  }
};
