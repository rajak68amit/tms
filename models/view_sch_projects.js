'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class view_sch_projects extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  view_sch_projects.init({
    amc_date: DataTypes.DATE,
    projects_id: DataTypes.NUMBER,
    projects_name: DataTypes.STRING,
    total_school: DataTypes.NUMBER,
    total_class: DataTypes.NUMBER
  }, {
    sequelize,
    modelName: 'view_sch_projects',
  });
  return view_sch_projects;
};