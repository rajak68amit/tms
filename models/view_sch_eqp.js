'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class view_sch_eqp extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {//
      view_sch_eqp.belongsTo(models.schools, { sourceKey: 'scode', foreignKey: 'id' });

    }
  }
  view_sch_eqp.init({
    equipmentName: DataTypes.STRING,
    udisecode: DataTypes.STRING,
    brandName: DataTypes.DATE,
    projectsname: DataTypes.STRING,
    warrantyEndDate: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'view_sch_eqp',timestamps:false
  });
  view_sch_eqp.removeAttribute('id');
  return view_sch_eqp;
};