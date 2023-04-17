require("express-async-errors");
const bcrypt = require('bcryptjs');
const { user, address } = require('../../models');
const statusCodes = require('../../utils/responseCode');
const { successHandler, sortHandler, catcherrHandler } = require('../../middleware/validation-middleware');
module.exports = {
    /* superviser profile  */
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
            include: [{
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
        });
        const data = { statusCodes: statusCodes.ok, msg: "Profile Details!", data: profile, success: true }
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
        try { } catch (error) {
            const data = { statusCodes: statusCodes.Internalservererror, error: error.message, msg: "Something went wrong!", success: false }
            catcherrHandler(res, data)
        }
    },
    // after verifying passcode
    async changepassword(req, res) {
        try {
            const userExist = await user.findOne({
                attributes: ['id', 'password'], where: { id: req.user }
            });

            const isPasswordMatched = await bcrypt.compare(req.body.currentpassword, userExist.dataValues.password);
            if (!isPasswordMatched) {
                const data = { msg: "Wrong password enterd!", statusCodes: statusCodes.Unauthorized, status: false }
                sortHandler(res, data);
            }
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(req.body.password, salt);
            const password = { password: hashPassword, token: '' }
            if (req.body.password === req.body.password_confirmation) {
                await user.update(password, {
                    where: { id: req.user }
                });
            }
            const data = { msg: "Password change successfully!", statusCodes: statusCodes.PartialContent, status: true }
            sortHandler(res, data);
        } catch (error) {
            const data = { statusCodes: statusCodes.Internalservererror, error: error.message, msg: "Something went wrong!", success: false }
            catcherrHandler(res, data)
        }
    },
}


/**
* @route GET /api/superviser:
* @api public[temp demo]
* @param {object} req
* @param {object} res
* @return {error|json}
* @author TMS TEAM
*/
/**
 * @swagger
 * /api/superviser/profile:
 *  get:
 *   tags:
 *    - Supervisor management 
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
 * api/superviser/update:
 *  put:
 *   tags:
 *    - Supervisor management
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
 * /api/superviser/complain-request:
 *  get:
 *   tags:
 *    - Supervisor management 
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
 * /api/superviser/school-lists:
 *  get:
 *   tags:
 *    - Supervisor management 
 *   responses:
 *    '200':
 *      description: school lists
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
 * /api/superviser/employee-lists:
 *  get:
 *   tags:
 *    - Supervisor management 
 *   responses:
 *    '200':
 *      description: employee lists
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
 * /api/superviser/pmreports-lists:
 *  get:
 *   tags:
 *    - Supervisor management 
 *   responses:
 *    '200':
 *      description: Pm Reports lists
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
 * /api/superviser/equipment-lists:
 *  get:
 *   tags:
 *    - Supervisor management
 *   parameters:
 *    - in: path
 *      id: equipment_id
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
   * /api/superviser/change-password:
   *  post:
    *   tags:
    *    - Supervisor management 
    *   requestBody:
    *    description: Change password
    *    required: true
    *    content:
    *      application/json:
    *        schema:
    *          type: object
    *          properties:
   *            currentpassword:
   *              type: string
   *            password:
   *              type: string
   *            password_confirmation:
   *             type: string
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