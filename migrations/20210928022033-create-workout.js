'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Workouts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      numOfSets: {
        type: Sequelize.INTEGER
      },
      numOfReps: {
        type: Sequelize.INTEGER
      },
      description: {
        type: Sequelize.STRING
      },
      muscles: {
        type: Sequelize.STRING
      },
      equipment: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING
      },
      author: {
        type: Sequelize.STRING
      },
      userID: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Workouts');
  }
};