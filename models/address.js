'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    
    static associate(models) {
      address.hasOne(models.blocks, { sourceKey: 'userid', foreignKey: 'id' });
      address.belongsTo(models.user, { sourceKey: 'userid', foreignKey: 'id' });

     //address.belongsTo(models.countrys, {sourceKey: 'country', foreignKey: 'id' });
      //address.belongsTo(models.states, { sourceKey: 'state', foreignKey: 'id' });

    }
    
  }
  
  address.init({
    userid: DataTypes.NUMBER,
    addressone: DataTypes.STRING,
    addresstwo: DataTypes.STRING,
    state: DataTypes.NUMBER,
    country: DataTypes.NUMBER,
    city: DataTypes.STRING,
    district: DataTypes.STRING,
    pincode: DataTypes.NUMBER,
    landmark: DataTypes.STRING,
    isActive: DataTypes.NUMBER,
    isDelete: DataTypes.NUMBER
  }, 
  
  {
    sequelize,
    modelName: 'address',
  },
    {
      getterMethods: {
        fullAddress: function () {
          return this.getDataValue('addressone') + ' ' + this.getDataValue('addresstwo')
        }
      }
    /*  ,setterMethods: {
        fullName: function (value) {
          var parts = value.split(' ')
          this.setDataValue('addressone', parts[parts.length - 1])
          this.setDataValue('addresstwo', parts[0]) // this of course does not work if the user has several first names
        }
      }*/
    }
  
  );
  return address;
};