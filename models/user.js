'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.User.hasMany(models.WorkoutPlan,{as:'WorkoutPlan',foreignKey:'userID'})
    }
  };
  User.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    feet:DataTypes.INTEGER,
    inches:DataTypes.INTEGER,
    pounds:DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};