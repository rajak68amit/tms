'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class comments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  comments.init({
    ticketId: DataTypes.NUMBER,
    userId: DataTypes.NUMBER,
    image: DataTypes.STRING,
    message: DataTypes.STRING,
    isActive: DataTypes.NUMBER,
    isDelete: DataTypes.NUMBER
  }, {
    sequelize,
    modelName: 'comments',
  });
  return comments;
};