/*jslint node: true */
/* jshint esversion: 8 */
/*jshint -W033 */
require("express-async-errors");
const { user, address } = require('../../models');
const statusCodes = require('../../utils/responseCode');
const { successHandler, sortHandler, catcherrHandler } = require('../../middleware/validation-middleware');
module.exports = {
    /* service enginerr profile  */
    async profile(req, res) {
            const status = req.params.status;
            const id = req.params.id;
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
                /*include: [{
                    model: address,
                    attributes: [
                        "addressone",
                        "addresstwo",
                        "state",
                        "country",
                        "city",
                        "pincode",
                        "district",
                        "landmark"
                    ],

                    where: {
                        isActive: status ? status : 1,
                    }
                }],
                */
            });
            const data = { statusCodes: statusCodes.ok, msg: "Profile Details!", data: profile, success: true }
            successHandler(res, data)
        throw new Error("Something went wrong!");
    }, async update(req, res) {
        console.log(req.user,"Update profile",req.body)
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

    }, async complains(req, res) {
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
        const data = { statusCodes: statusCodes.PartialContent, msg: "Complain Lists!", success: true }
            sortHandler(res, data)
        throw new Error("Something went wrong!");
    }
}

/**
 * @swagger
 * /api/serviceengineer/profile:
 *  get:
 *   tags:
 *    - Service engineer management 
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
 * api/serviceengineer/update:
 *  put:
 *   tags:
 *    - Service engineer management
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
 * /api/serviceengineer/block-school:
 *  get:
 *   tags:
 *    - Service engineer management
 *   responses:
 *    '200':
 *      description: school block details
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
 * /api/serviceengineer/manage-comment/{id}:
 *  get:
 *   tags:
 *    - Service engineer management
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
 * /api/serviceengineer/manage-comment:
 *  get:
 *   tags:
 *    - Service engineer management 
 *   responses:
 *    '200':
 *      description: comments lists
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
 * /api/serviceengineer/complain-request:
 *  get:
 *   tags:
 *    - Service engineer management 
 *   responses:
 *    '200':
 *      description: complain request lists
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
 * /api/serviceengineer/manage-comment/{id}:
 *  delete:
 *   tags:
 *    - Service engineer management
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
   * /api/serviceengineer/manage-comment:
   *  post:
    *   tags:
    *    - Service engineer management 
    *   requestBody:
    *    description: comment add
    *    required: true
    *    content:
    *      multipart/form-data:
    *        schema:
    *          type: object
    *          properties:
   *            image:
   *              type: file
   *            ticketid:
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