/*jslint node: true */
/* jshint esversion: 8 */
/*jshint -W033 */
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class trainings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      trainings.hasMany(models.schools, { sourceKey: 'scode', foreignKey: 'id' });
    }
  }
  trainings.init({
    scode: DataTypes.NUMBER,
    subject: DataTypes.STRING,
    date: DataTypes.DATE,
    isActive: DataTypes.NUMBER,
    isDelete: DataTypes.NUMBER
  }, {
    sequelize,
    modelName: 'trainings',
  });
  return trainings;
};