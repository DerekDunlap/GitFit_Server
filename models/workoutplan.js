'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class WorkoutPlan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  WorkoutPlan.init({
    day: DataTypes.STRING,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    numOfSets: DataTypes.INTEGER,
    numOfReps: DataTypes.INTEGER,
    workoutID: DataTypes.INTEGER,
    userID: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'WorkoutPlan',
  });
  return WorkoutPlan;
};