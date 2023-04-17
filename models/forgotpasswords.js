'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class forgotpasswords extends Model {
    static associate(models) {
      forgotpasswords.belongsTo(models.user, { sourceKey: 'id',foreignKey: 'uid'});
    }
  }
  forgotpasswords.init({
    uid: DataTypes.NUMBER,
    Epass: DataTypes.STRING,
    isActive: DataTypes.NUMBER,
  }, {
    sequelize,
    modelName: 'forgotpasswords',
  });
  return forgotpasswords;
};