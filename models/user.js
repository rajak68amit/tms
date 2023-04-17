'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      user.hasOne(models.address, { sourceKey: 'id', foreignKey: 'userid' });
      user.hasOne(models.roles, { sourceKey: 'roleid', foreignKey: 'id' });
      //user.hasOne(models., { sourceKey: 'id', foreignKey: 'serviceengid' }); // find user block id 
      user.hasOne(models.tickets, { sourceKey: 'id', foreignKey: 'serviceengid' }); // find user block id 
    }
  }

  user.init({
    roleid: DataTypes.NUMBER,
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.NUMBER,
    token: DataTypes.STRING,
    password: DataTypes.STRING,
    isActive: DataTypes.NUMBER,
    lastlogin: DataTypes.DATE,
    isDelete: DataTypes.NUMBER
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};
