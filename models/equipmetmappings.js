/*jslint node: true */
/* jshint esversion: 8 */
/*jshint -W033 */
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class equipmetmappings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  equipmetmappings.init({
    scode: {
      type: DataTypes.INTEGER,
      references: {
        model: 'schools',
        key: 'id'
      }
    },
    eqpid: {
      type: DataTypes.INTEGER,
      references: {
        model: 'equipments',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'equipmetmappings',
  });
  return equipmetmappings;
};