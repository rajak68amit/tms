'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class citys extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  citys.init({
    sid: DataTypes.NUMBER,
    name: DataTypes.STRING,
    isActive: DataTypes.NUMBER
  }, {
    sequelize,
    modelName: 'citys', timestamps: false,
  });
  return citys;
};