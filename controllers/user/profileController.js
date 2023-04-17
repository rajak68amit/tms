/*jslint node: true */
/* jshint esversion: 8 */
/*jshint -W033 */
require("express-async-errors");
var { Sequelize, Op, QueryTypes } = require('sequelize');
const { user, view_sch_eqp, schools } = require('../../models');
const statusCodes = require('../../utils/responseCode');
const { successHandler, sortHandler, catcherrHandler } = require('../../middleware/validation-middleware');
module.exports = {
    /* user profile  */
    async profile(req, res) {
            const status = req.params.status;
        const profile = await user.findAll({
                attributes: [
                    "id",
                    "roleid",
                    "name",
                    "phone",
                    "email"
                ],
                where: {
                    isActive: status ? status : 1, id: req.user
                },
            });
            const data = { statusCodes: statusCodes.ok, msg: "Profile Details!", data: profile }
            successHandler(res, data)
       throw new Error("Something went wrong!");
    },
    async update(req, res) {
            const {
                name,
                phone, 
            } = req.body
        await user.update({
                name: name,
                phone: phone,
            }, {
                where: {
                    id: req.user
                }
            });
        const data = { statusCodes: statusCodes.PartialContent, msg: "Profile Updated Successfully!", success: true }
           sortHandler(res, data)
        throw new Error("Something went wrong!");
    },

     async usersequipmentdetails(req, res) {
        try {
            let schoolid ='';
            const udisecode = await schools.findOne({
                attributes: ["udisecode"],
                userid: req.user})

            if (udisecode) {
                schoolid = udisecode.dataValues.udisecode
            }
            const schoolbyeqp = await view_sch_eqp.findAll({
                group: ["equipmentName"],
                attributes: ['equipmentName', 'warrantyEndDate', [Sequelize.fn("COUNT", Sequelize.col("view_sch_eqp.equipmentName")), "total"]],
                where: { udisecode: schoolid }
            });
            const data = { statusCodes: statusCodes.ok, msg: "Equipmenttypes Lists!", data: schoolbyeqp, success: true }
            successHandler(res, data)
        } catch (error) {
            const data = { statusCodes: statusCodes.Internalservererror, error: error.message, msg: "Something went wrong!", success: false }
            catcherrHandler(res, data)
        }

        //throw new Error("Something went wrong!");

    },
}


/**
* @route GET /api/user:
* @api public[temp demo]
* @param {object} req
* @param {object} res
* @return {error|json}
* @author TMS TEAM
*/
/**
 * @swagger
 * /api/user/profile:
 *  get:
 *   tags:
 *    - User management  
 *   responses:
 *    '200':
 *      description: profile details
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
 * api/user/update:
 *  put:
 *   tags:
 *    - User management 
   *   requestBody:
    *    description: profile update
    *    required: true
    *    content:
    *      application/json:
    *        schema:
    *          type: object
    *          properties:
   *            name:
   *              type: string
   *            phone:
   *              type: number
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
 * /api/user/complain:
 *  get:
 *   tags:
 *    - User management 
 *   responses:
 *    '200':
 *      description: complain details
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
 * /api/user/equipment-log:
 *  get:
 *   tags:
 *    - User management  
 *   responses:
 *    '200':
 *      description: Equipment log
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
 * /api/user/manage-complain:
 *  get:
 *   tags:
 *    - User management  
 *   responses:
 *    '200':
 *      description: complain lists
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
 * /api/user/manage-complain/{id}:
 *  delete:
 *   tags:
 *    - User management
 *   parameters:
 *    - in: path
 *      id: path
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

/**
 * @swagger
 * /api/user/manage-complain/{id}:
 *  get:
 *   tags:
 *    - User management
 *   parameters:
 *    - in: path
 *      id: path
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


/**
   * @swagger
   * /api/user/add-training-request:
   *  post:
    *   tags:
    *    - User management 
    *   requestBody:
    *    description: comment add
    *    required: true
    *    content:
    *      application/json:
    *        schema:
    *          type: object
    *          properties:
   *            subject:
   *              type: string
   *            date:
   *              type: date
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
 * /api/user/training-request-lists:
 *  get:
 *   tags:
 *    - User management
 *   responses:
 *    '200':
 *      description: training request lists
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
 * /api/user/manage-training-request/{id}:
 *  get:
 *   tags:
 *    - User management
 *   parameters:
 *    - in: path
 *      id: path
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

/**
 * @swagger
 * /api/user/manage-training-request/{id}:
 *  delete:
 *   tags:
 *    - User management
 *   parameters:
 *    - in: path
 *      id: path
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