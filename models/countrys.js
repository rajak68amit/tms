'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class countrys extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      countrys.hasMany(models.states, { sourceKey:'id',foreignKey:'cid'});
      //countrys.hasOne(models.countrys, { sourceKey: 'id', foreignKey: 'state' });
      //address.belongsTo(models.countrys, { sourceKey: 'id', foreignKey: 'country' });
    
      // define association here
    }
  }
  countrys.init({
    name: DataTypes.STRING,
    isActive: DataTypes.NUMBER
  }, {
    sequelize,
    modelName: 'countrys',timestamps:false,
  });
  return countrys;
};