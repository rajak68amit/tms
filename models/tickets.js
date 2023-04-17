/*jslint node: true */
/* jshint esversion: 8 */
/*jshint -W033 */
'use strict';
const {
  Model, ENUM
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tickets extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      tickets.belongsTo(models.schools, { sourceKey: 'scode', foreignKey: 'id' });
     // tickets.hasMany(models.schools, { sourceKey: 'scode', foreignKey: 'id' });
      tickets.hasOne(models.user, { sourceKey: 'serviceengid', foreignKey: 'id' });
      tickets.hasMany(models.equipments, { sourceKey: 'equipmentid', foreignKey: 'id' });
    }
  }
  tickets.init({
    userid: DataTypes.NUMBER,
    supervisorid: DataTypes.NUMBER,
    equipmentid: DataTypes.NUMBER,
    serviceengid: DataTypes.NUMBER,
    details: DataTypes.STRING,
    ticketid: DataTypes.STRING,
    isActive: DataTypes.NUMBER,
    isDelete: DataTypes.NUMBER,
    status: { type: ENUM("open","in-progress", "escalated","closed")},
    scode: {
      type: DataTypes.INTEGER,
      references: {
        model: 'schools',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'tickets',
  });
  return tickets;
};