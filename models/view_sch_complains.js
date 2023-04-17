'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class view_sch_complains extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  view_sch_complains.init({
    ticketid: DataTypes.NUMBER,
    created_date: DataTypes.DATE,
    block_name: DataTypes.STRING,
    issues_details: DataTypes.STRING,
    assignTo: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'view_sch_complains',
  });
  return view_sch_complains;
};