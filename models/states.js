'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class states extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      states.hasMany(models.citys, { sourceKey: 'id', foreignKey: 'sid' });
    }
  }
  states.init({
    cid: DataTypes.NUMBER,
    name: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'states', timestamps: false,
  });
  return states;
};