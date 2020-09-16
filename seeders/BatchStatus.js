'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('BatchStatuses', [
      {
        name : 'READY',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name : 'BUSY',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name : 'ERROR',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name : 'PAUSED',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('BatchStatuses', null, {});
  }
};
