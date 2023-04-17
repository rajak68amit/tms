'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class engsupervisermappings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      engsupervisermappings.hasMany(models.schools, { sourceKey: 'seid', foreignKey: 'serviceengid' });
      engsupervisermappings.hasMany(models.user, { sourceKey: 'seid', foreignKey: 'id' });

    }
  }
  engsupervisermappings.init({
    seid: DataTypes.NUMBER,
    sid: DataTypes.NUMBER,
  }, {
    sequelize, modelName: 'engsupervisermappings', timestamps:false
  });
  return engsupervisermappings;
};