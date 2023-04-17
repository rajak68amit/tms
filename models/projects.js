'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class projects extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      projects.hasMany(models.blocks, { sourceKey: 'id', foreignKey: 'pid' });
    }
  }
  projects.init({
    emcdate: DataTypes.STRING,
    details: DataTypes.STRING,
    name: DataTypes.STRING,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    isActive: DataTypes.NUMBER,
    isDelete: DataTypes.NUMBER
  }, {
    sequelize,
    modelName: 'projects',
  });
  return projects;
};

