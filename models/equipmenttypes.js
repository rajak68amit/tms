'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class equipmenttypes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    //  equipmenttypes.hasMany(models.equipments, { foreignKey: 'typeId' });

      
    }
  }
  equipmenttypes.init({
    details: DataTypes.STRING,
    type: DataTypes.STRING,
    isActive: DataTypes.NUMBER,
    isDelete: DataTypes.NUMBER
  }, {
    sequelize,
    modelName: 'equipmenttypes',
  });
  return equipmenttypes;
};