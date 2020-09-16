'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Batches', [
      {
        name : 'helloJob',
        StatusId : 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name : 'worldJob',
        StatusId : 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Batches', null, {});
  }
};
