/*jslint node: true */
/* jshint esversion: 8 */
/*jshint -W033 */
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class schools extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     static associate(models) {
      // define association here
      schools.hasMany(models.tickets, { sourceKey: 'id', foreignKey: 'scode' });
       schools.hasMany(models.pmreports, { sourceKey: 'udisecode', foreignKey: 'udiseid' });
      schools.hasMany(models.equipmetmappings, { as: 'participatingequipmetmappings', sourceKey: 'id', foreignKey: 'scode' });
     //schools.hasOne(models.blocks, { sourceKey: 'blockid', foreignKey: 'id' });
      schools.belongsTo(models.blocks, { sourceKey: 'blockid', foreignKey: 'id' });
      schools.belongsTo(models.projects, { sourceKey: 'pid', foreignKey: 'id' });
      schools.hasOne(models.address, { sourceKey: 'id', foreignKey: 'userid' });
      schools.hasOne(models.trainings, { sourceKey: 'id', foreignKey: 'scode' });
      schools.hasOne(models.view_sch_eqp, { sourceKey: 'udisecode', foreignKey: 'udisecode' });
       schools.hasMany(models.engsupervisermappings, { sourceKey: 'serviceengid', foreignKey: 'seid' });
     // schools.hasOne(models.user, { sourceKey: 'userid', foreignKey: 'id' });
      schools.belongsTo(models.user, { foreignKey: 'userid' });
      schools.belongsToMany(models.equipments, { through: models.equipmetmappings, foreignKey: 'scode' }); /// display service engineer related complains request
      //School.belongsTo(Block, { foreignKey: 'blockid' });
    }
  }
  schools.init({
    name: DataTypes.STRING,
    state: DataTypes.STRING,
    udisecode: { type: DataTypes.STRING, unique: true },
    city: DataTypes.STRING,
    district: DataTypes.STRING,
    pincode: DataTypes.NUMBER,
    userid: { type: DataTypes.NUMBER, unique: true },
    blockid: DataTypes.NUMBER,
    smartclass: DataTypes.NUMBER,
    isActive: DataTypes.NUMBER,
    isDelete: DataTypes.NUMBER
  }, {
    sequelize,
    modelName: 'schools',
  });
  return schools;
};
/**
     * @swagger
     * /api/admin/school-list:
     *  get:
     *   tags:
     *    - School Management 
     *   responses:
     *    '200':
     *      description: successful
     *      content:
     *        application/json:
     *          schema:
     *            $ref: '#/components/schemas/SuccessResponse'
     *    '500':
     *      description: error
     *      content:
     *        application/json:
     *          schema:
     *            $ref: '#/components/schemas/ErrorResponse'
     *    '400':
     *      description: Bad request
     *    '401':
     *      description: Authorization invalid
     *    '404':
     *      description: Not found
     *    '422':
     *      description: validation error
     *      content:
     *        application/json:
     *          schema:
     *            $ref: '#/components/schemas/ValidationResponse'
     */

/**
 * @swagger
 * api/admin/manage-role/{id}:
 *  get:
 *   tags:
 *    - School Management
 *   parameters:
 *    - in: path
 *      id: sub
 *      type: number
 *   responses:
 *    '200':
 *      description: successful
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/SuccessResponse'
 *    '500':
 *      description: error
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/ErrorResponse'
 *    '400':
 *      description: Bad request
 *    '401':
 *      description: Authorization invalid
 *    '404':
 *      description: Not found
 *    '422':
 *      description: validation error
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/ValidationResponse'
 */ 