'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'Users',
        'feet',
        {
          type:Sequelize.INTEGER
        }
      ),
      queryInterface.addColumn(
        'Users',
        'inches',
        {
          type:Sequelize.INTEGER
        }
      ),
      queryInterface.addColumn(
        'Users',
        'pounds',
        {
          type: Sequelize.INTEGER
        }
      )
      ])
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Users','feet'),
      queryInterface.removeColumn('Users','inches'),
      queryInterface.removeColumn('Users','pounds')
    ])
  }
};
