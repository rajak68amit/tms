'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class pmreports extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  pmreports.init({
    udiseid: DataTypes.STRING,
    year: DataTypes.DATE,
    qone_date: DataTypes.DATE,
    qone_url: DataTypes.STRING,
    qtwo_date: DataTypes.DATE,
    qtwo_url: DataTypes.STRING,
    qthree_date: DataTypes.DATE,
    qthree_url: DataTypes.STRING,
    qfour_date: DataTypes.DATE,
    qfour_url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'pmreports',
  });
  return pmreports;
};