/*jslint node: true */
/* jshint esversion: 8 */
/*jshint -W033 */

'use strict';
const {
  Model
} = require('sequelize');
const projects = require('./projects');
module.exports = (sequelize, DataTypes) => {
  class blocks extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      blocks.hasMany(models.schools, { sourceKey: 'id', foreignKey: 'blockid' });
      blocks.belongsTo(models.projects, { sourceKey: 'pid', foreignKey: 'id' });
    }
  }
  blocks.init({
    name: DataTypes.STRING,
    pid: DataTypes.NUMBER,
    isActive: DataTypes.NUMBER,
    isDelete: DataTypes.NUMBER
  },  {
    sequelize,
    modelName: 'blocks',
  });
  return blocks;
};