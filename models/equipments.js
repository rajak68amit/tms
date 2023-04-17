/*jslint node: true */
/* jshint esversion: 8 */
/*jshint -W033 */
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class equipments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      // User: id
      // Role: id, userId, organizationId
      // Organizations: id
      // Asso_Organization_User: id, userId, organizationId


//   User.Organizations = User.belongsToMany(Organization, {
//     through: Asso_Organization_User
// })
// Organization.Roles = Organization.haMany(Role, {
//     foreignKey: 'organizationId'
//})

/* 
equipmetmappings :eqpid	udisecode
 */
    equipments.belongsToMany(models.schools, { through: models.equipmetmappings, foreignKey: 'eqpid' }); /// display service engineer related complains request
     /// equipments.hasMany(models.equipmetmappings, { sourceKey: 'typeId', foreignKey: 'eqpid' })
      // Organization.Roles = Organization.haMany(Role, {
      //   foreignKey: 'organizationId'
      // })
      ///equipments.hasOne(models.school, { though:equipmetmappings });
      //equipments.hasMany(models.equipmetmappings, { foreignKey: 'typeId' });
      // define association here
    }
  }
  equipments.init({
    name: DataTypes.STRING,
    invoiceDate: DataTypes.DATE,
    manufacturerName: DataTypes.STRING,
    warrantyEndDate: DataTypes.DATE,
    about: DataTypes.STRING,
    serialno: DataTypes.STRING,
    typeId: DataTypes.NUMBER,
    isActive: DataTypes.NUMBER,
    isDelete: DataTypes.NUMBER
  }, {
    sequelize,
    modelName: 'equipments',
  });
  return equipments;
};