'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class zones extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  zones.init({
    name: DataTypes.STRING,
    lastActive: DataTypes.DATE,
    isDelete: DataTypes.NUMBER
  }, {
    sequelize,
    modelName: 'zones',
  });
  return zones;
};