/*jslint node: true */
/* jshint esversion: 8 */
/*jshint -W033 */
require("express-async-errors");
const { user, roles, schools, engsupervisermappings, address, countrys } = require('../../models');
const {
    sequelize
} = require('sequelize')

var { Sequelize, Op, QueryTypes } = require('sequelize');
const db = require('../../models');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const mailconfig = require('../../config/mailconfig');
const statusCodes = require('../../utils/responseCode');
const { successHandler, sortHandler, catcherrHandler, successHandlerpaginate } = require('../../middleware/validation-middleware');
module.exports = {
    

    async userCreate(req, res) {
        try { 
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashPassword;
        req.body.isActive = 1;
        const userrequesdt = {
            roleid: req.body.roleid,
            name: req.body.name,
            phone: req.body.phone,
            email: req.body.email,
            password: req.body.password,
            isActive: req.body.isActive,
        };
            const uda = new user(userrequesdt);
            const userSaveData = await uda.save()
       
        const addressData = {
            userid: userSaveData.dataValues.id,
            addressone: req.body.addresslineone,
            addresstwo: req.body.addresslinetwo,
            state: req.body.states,
            country: req.body.country,
            city: req.body.city,
            district: req.body.distric,
            pincode: req.body.pincode,
            isActive:1
        }
            const userAddress = new address(addressData);
            await userAddress.save()

        const data = { statusCodes: statusCodes.Created, msg: "User created successfully!", success: true }
        sortHandler(res, data)
        } catch(error) {
        const data = { statusCodes: statusCodes.Internalservererror, error: error.message, msg: "Something went wrong!", success: false }
        catcherrHandler(res, data)
    }
    },
    
/* user listing  */
    /// GET API to fetch all added user Details.
    
    
    async userslists(req, res) {
        try {
            const limit = 20;
            let whereClause ={};
            let whereClauserole = {};
            let sortby = req.query.sortby || 'id';
            let sort = req.query.sort || 'asc';
            let page = parseInt(req.query.page) || 1;
            let offset = 0 + (page - 1) * limit;
            const status = req.query.status;
            const role = req.body.role || req.query.role ;
            if (req.query.search && req.query.search != '') {
                const search = req.body.search || req.query.search
                whereClause = {
                    [Op.or]: [
                        { 'name': { [Op.like]: `%${search}%` } },
                         { 'phone': { [Op.like]: `%${search}%` } },
                        { 'email': { [Op.like]: `%${search}%` } },
                        { 'isActive': status || 1 }
                    ]
                };
                // whereClauserole = {
                //     [Op.or]: [
                //         { 'roles.name': { [Op.like]: `%${role}%` } }
                //     ]
                // };
            }
            if (req.query.role && req.query.role != '') {
                whereClauserole = {
                    [Op.or]: [
                        { 'name': { [Op.like]: `%${role}%` } }
                    ]
                };
            }
            let ordersort = [[sortby, sort]];
            const users = await user.findAll({
                attributes: ['id', 'roleid', 'name', 'phone', 'email'],
                where: whereClause,
                offset: offset,
                limit: limit,
                order: ordersort,
                include: [{
                    attributes: ['name'],
                    model: roles,
                    where: whereClauserole,
                },{
                    attributes: ['addressone', 'addresstwo', 'city','district'],
                    model: address,
                }
            
            ],
            });
            const userspaginate = await user.count({
                where: whereClause,
                include: [{
                    attributes: [[Sequelize.fn("COUNT", Sequelize.col("roles.name")), "itemCount"]],
                    model: roles,
                    where: whereClauserole
                }],
            });

            const pagingData = { total: userspaginate, per_page: page }
            const data = { statusCodes: statusCodes.ok, msg: "User Lists!", data: users, success: true, page: pagingData }
            successHandlerpaginate(res, data)
        } catch (error) {
            const data = { statusCodes: statusCodes.Internalservererror, error: error.message, msg: "Something went wrong!", success: false }
            catcherrHandler(res, data)
        }
    },
    
    async supervisorLists(req, res) {
        try {
            const users = await user.findAll({
                attributes: ['id', 'roleid', 'name', 'phone', 'email'],
                include: [{
                    attributes: ['name'],
                    model: roles,
                    where: { id: 3 },// 3 = superviser in roles table
                }],
            });
            const data = { statusCodes: statusCodes.ok, msg: "supervisor Lists!", data: users, success: true }
            successHandler(res, data)
        } catch (error) {
            const data = { statusCodes: statusCodes.Internalservererror, error: error.message, msg: "Something went wrong!", success: false }
            catcherrHandler(res, data)
        }
    },
    async serviceEngineerLists(req, res) {
        try {
            const users = await user.findAll({
                attributes: ['id', 'roleid', 'name', 'phone', 'email'],
                include: [{
                    attributes: ['name'],
                    model: roles,
                    where: { id: 2 },// 2 = service engineer in roles table
                }],
            });
            const data = { statusCodes: statusCodes.ok, msg: "service engineer Lists!", data: users, success: true }
            successHandler(res, data)
        } catch (error) {
            const data = { statusCodes: statusCodes.Internalservererror, error: error.message, msg: "Something went wrong!", success: false }
            catcherrHandler(res, data)
        }
    },

    /* user list by role */
    async userslistsbysearch(req, res) {
        try {
            const role = req.query.role;
            const status = req.query.status;
            const users = await user.findAll({
                attributes: ['id', 'roleid', 'name', 'phone', 'email', 'createdAt', 'isActive'],
                where: {
                    isActive: status || 1,
                },
                include: [{
                    attributes: ['name'],
                    model: roles,
                    where: {
                        name: role,
                    },
                }],
            });
            const data = { statusCodes: statusCodes.ok, msg: "User Lists!", data: users, success: true }
            successHandler(res, data)
        } catch (error) {
            const data = { statusCodes: statusCodes.Internalservererror, error: error.message, msg: "Something went wrong!", success: false }
            catcherrHandler(res, data)
        }
    },

    async update(req, res) {
        try{
        const userid = req.params.id
        await user.update({
            roleid: req.body.roleid,
            name: req.body.name,
            phone: req.body.phone,
            email: req.body.email,
        }, {
            where: {
                id: userid,
            }
        });
            await address.update({
                addressone: req.body.addresslineone,
                addresstwo: req.body.addresslinetwo,
                state: req.body.states,
                country: req.body.country,
                city: req.body.city,
                district: req.body.distric,
                pincode: req.body.pincode,
            }, { where: { userid: userid }
            });
            const data = { statusCodes: statusCodes.PartialContent, msg: "User updated Successfully!", success: true }
        sortHandler(res, data)
    } catch(error) {
        const data = { statusCodes: statusCodes.Internalservererror, error: error.message, msg: "Something went wrong!", success: false }
        catcherrHandler(res, data)
    }
    },

    /* single user details by id */
    async singleuser(req, res) {
        try {
        const id = req.params.id;
        const userdata = await db.sequelize.query("SELECT users.name, roles.name as role_name, users.phone, users.email, addresses.addressone, addresses.addresstwo,countrys.name as country_name, states.name as state_name, addresses.district, addresses.pincode FROM`users` join roles on roles.id = users.roleid join addresses on addresses.userid = users.id JOIN countrys ON countrys.id = addresses.country join states on states.id = addresses.country where users.id="+id, {
            type: QueryTypes.SELECT,
        })
        
        const data = { statusCodes: statusCodes.ok, msg: "User Detail!", data: userdata, success: true }
        successHandler(res, data)
    } catch(error) {
        const data = { statusCodes: statusCodes.Internalservererror, error: error.message, msg: "Something went wrong!", success: false }
        catcherrHandler(res, data)
    }
    },
    async mapOrNoteUser(req, res) {
        try {
        const userid = req.params.id || req.body.id || req.query.id;
        const roleid = req.params.roleid || req.body.roleid || req.query.roleid;
        let userdata =false;
            if (roleid == 3) { // 3 = supervisor 
                const usersemapId = await engsupervisermappings.findOne({
                    attributes: ['sid'],
                    where: { sid: userid }
                });
                if (usersemapId) 
                userdata = true
              } else if(roleid == 2) { // service Engineer
                        const usersId = await schools.findOne({
                            attributes: ['serviceengid'],
                            where: { serviceengid: userid }
                            });
                        const usersemapId = await engsupervisermappings.findOne({
                            attributes: ['seid'],
                            where: { seid: userid }
                        });
                if (usersId && usersemapId){
                    userdata = true
                }
             }
            const data = { statusCodes: statusCodes.ok, msg: "User Detail!", data: userdata, success: true }
            successHandler(res, data)
         } catch (error) {
            const data = { statusCodes: statusCodes.Internalservererror, error: error.message, msg: "Something went wrong!", success: false }
            catcherrHandler(res, data)
        }
    },
    /* user delete  */
    async delete(req, res) {
        try {
            let datatrue =false;
            const roleid = req.body.roleid
            const userid = req.params.id
            const repid = req.body.id
            if (repid && repid != '' && repid!=undefined){
                /// check role id of users
            const preID = await user.findOne({attributes: ['roleid'], where: { id: userid } });
            const previoID = await user.findOne({ attributes: ['roleid'],where: {id: repid } });
                if (preID && previoID && preID.dataValues.roleid != previoID.dataValues.roleid) {
                    const data = { msg: "Same Role Not Found", statusCodes: statusCodes.ok, success: true }
                    sortHandler(res, data);
                }
              // update engsupervisermappings
                if (roleid && roleid !=undefined && roleid == 3) { // 3 = supervisor 
                await engsupervisermappings.update({
                    sid: repid,
                }, {
                    where: {
                        sid: userid,
                    }
                });
                datatrue = true;
                      // update schools
                } else if (roleid && roleid != undefined && roleid == 2) {// service Engineer
                await schools.update({serviceengid: repid}, {
                    where: {serviceengid: userid }
                });
                 await engsupervisermappings.update({
                    seid: repid}, { where: {seid: userid }
                });
                    datatrue = true
            }
        } else {
                const seid = await engsupervisermappings.findOne({ attributes: ['seid'], where: { seid: userid } });
                const serviceengid = await schools.findOne({ attributes: ['serviceengid'], where: { serviceengid: userid } });
                const sid = await engsupervisermappings.findOne({ attributes: ['sid'], where: { sid: userid } });
                if (serviceengid || seid || sid){
                    const data = { msg: "not valied id", statusCodes: statusCodes.Notfound, success: true }
                    sortHandler(res, data);
                }
                datatrue = true
        }
            if(datatrue==true){
                await user.update({ isDelete: 1 }, {
                    where: { id: userid }
                });
                await address.update({ isDelete: 1 }, {
                    where: { userid: userid }
                }); 
            }
            const data = { msg: "delete Successfully", statusCodes: statusCodes.ok, success: true }
            sortHandler(res, data);
        } catch (error) {
            const data = { statusCodes: statusCodes.Internalservererror, error: error.message, msg: "Something went wrong!", success: false }
            catcherrHandler(res, data)
        }
    },

    async email(req, res) {
        var transporter = nodemailer.createTransport({
            host: process.env.MHost,
            port: process.env.MPORT,
            auth: {
                user: process.env.MUSERNAME,
                pass: process.env.MPASSWORD
            }
        });
        const mailData = {
            from: 'youremail@gmail.com',
            to: "amitkumarrajak68@gmail.com",
            subject: "hello",
            text: "hello man ",
            html: '<b>Hey there! </b><br> This is our first message sent with Nodemailer<br/>',
        };
        const email = transporter.sendMail(mailData, (error, info) => {
            if (error) {
                const data = { statusCodes: statusCodes.PreconditionFailed, error: error.message, msg: "Something went wrong!", success: false }
                catcherrHandler(res, data)
            }
            const data = { statusCodes: statusCodes.ok, msg: "Email send", data: info.messageId, success: true }
            successHandler(res, data)
        });
        throw new Error("Something went wrong!");
    }
}
/* use create  */

/**
* @swagger
* /api/admin/usercreate:
*  post:
*   tags:
*    - Admin Users Manage
*   requestBody:
*    description: User Add
*    required: true
*    content:
*      application/json:
*        schema:
*          type: object
*          properties:
*            roleid:
*              type: number
*            name:
*              type: string
*            phone:
*              type: number
*            password:
*              type: string
*            password_confirmation:
*              type: string
*            addresslineone:
*              type: string
*            addresslinetwo:
*              type: string
*            states:
*              type: number
*            pincode:
*              type: number
*            country:
*              type: number
*            city:
*              type: string
*            distric:
*              type: string
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
* update item quantity in shopping cart
* @route POST /cart/updatecart:
* @api public[temp demo]
* @param {object} req
* @param {object} res
* @return {error|json}
* @author Deepak Tiwari
*/

/**
 * @swagger
 * /api/admin/manage-user/{id}:
 *  put:
 *   tags:
 *    - Admin Users Manage
 *   requestBody:
 *    description: Update user details
 *    required: true
 *    content:
 *      application/json:
 *        schema:
 *          type: object
 *          properties:
 *            roleid:
*              type: number
*            name:
*              type: string
*            phone:
*              type: number
*            password:
*              type: string
*            password_confirmation:
*              type: string
*            addresslineone:
*              type: string
*            addresslinetwo:
*              type: string
*            states:
*              type: number
*            pincode:
*              type: number
*            country:
*              type: number
*            city:
*              type: string
*            distric:
*              type: string
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
     * fetch all added user Details
     * @route GET /api/admin/manage-user:
     * @api public[temp demo]
     * @param {object} req
     * @param {object} res
     * @return {error|json}
     * @author TMS TEAM
     */
/**
 * @swagger
 * /api/admin/manage-user:
 *  get:
 *   tags:
 *    - Admin Users Manage
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
 * /api/admin/supervisor-lists:
 *  get:
 *   tags:
 *    - Admin Users Manage
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
 * api/admin/service-engineer-lists:
 *  get:
 *   tags:
 *    - Admin Users Manage
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
 * /api/admin/manage-user/{id}:
 *  get:
 *   tags:
 *    - Admin Users Manage
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
 * /api/admin/manage-user/{id}:
 *  delete:
 *   tags:
 *    - Admin Users Manage
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
   * /api/admin/manage-equipment-type:
   *  post:
    *   tags:
    *    - Admin equipment manage 
    *   requestBody:
    *    description: add equipment type
    *    required: true
    *    content:
    *      application/json:
    *        schema:
    *          type: object
    *          properties:
   *            type:
   *              type: string
   *            details:
   *              type: string
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
 * /api/admin/manage-equipment-type:
 *  get:
 *   tags:
 *    - Admin equipment manage
 *   responses:
 *    '200':
 *      description: equipment type lists
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
 * /api/admin/manage-equipment-type/{id}:
 *  get:
 *   tags:
 *    - Admin equipment manage
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
 * /api/admin/manage-equipment-type/{id}:
 *  delete:
 *   tags:
 *    - Admin equipment manage
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
 * /api/admin/manage-equipment-type/{id}:
 *  delete:
 *   tags:
 *    - Admin equipment manage
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
   * /api/admin/manage-equipment:
   *  post:
    *   tags:
    *    - Admin equipment manage 
    *   requestBody:
    *    description: add equipment 
    *    required: true
    *    content:
    *      application/json:
    *        schema:
    *          type: object
    *          properties:
   *            name:
   *              type: string
   *            invoiceDate:
   *              type: string
   *              format: date
   *            manufacturerName:
   *              type: string
   *            warrantyEndDate:
   *              type: string
   *              format: date
   *            about:
   *              type: string
   *            serialno:
   *              type: string
   *            typeId:
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
 * /api/admin/manage-equipment:
 *  get:
 *   tags:
 *    - Admin equipment manage
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
 * /api/admin/manage-equipment/{id}:
 *  put:
 *   tags:
 *    - Admin Users Manage
 *   requestBody:
 *    description: Update user details
 *    required: true
 *    content:
 *      application/json:
  *        schema:
    *          type: object
    *          properties:
   *            name:
   *              type: string
   *            invoiceDate:
   *              type: string
   *              format: date
   *            manufacturerName:
   *              type: string
   *            warrantyEndDate:
   *              type: string
   *              format: date
   *            about:
   *              type: string
   *            serialno:
   *              type: string
   *            typeId:
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
 * /api/admin/manage-equipment/{id}:
 *  get:
 *   tags:
 *    - Admin equipment manage
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
 * /api/admin/manage-equipment/{id}:
 *  delete:
 *   tags:
 *    - Admin equipment manage
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
 * /api/admin/training-requests:
 *  get:
 *   tags:
 *    - Admin training manage
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
 * /api/admin/training-requests/{id}:
 *  delete:
 *   tags:
 *    - Admin training manage
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
 * /api/admin/service-eng-reports:
 *  get:
 *   tags:
 *    - Admin service engineer manaage
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
* /api/admin/manage-school:
*  post:
*   tags:
*    - Admin School Manage
*   requestBody:
*    description: school Add
*    required: true
*    content:
*      application/json:
*        schema:
*          type: object
*          properties:
*            roleid:
*              type: number
*            name:
*              type: string
*            phone:
*              type: number
*            email:
*              type: string
*            addresslineone:
*              type: string
*            addresslinetwo:
*              type: string
*            states:
*              type: number
*            pincode:
*              type: number
*            country:
*              type: number
*            city:
*              type: string
*            distric:
*              type: string
*            udisecode:
*              type: string
*            serviceengid:
*              type: number
*            smartclass:
*              type: number
*            blockid:
*              type: number
*            pid:
*              type: number
*            password:
*              type: string
*            password_confirmation:
*              type: string
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
* /api/admin/manage-school/{id}:
*  put:
*   tags:
*    - Admin School Manage
*   parameters:
*     - in: path
*       id: path
*       type: number
*   requestBody:
*    description: school update
*    required: true
*    content:
*      application/json:
*        schema:
*          type: object
*          properties:
*            roleid:
*              type: number
*            name:
*              type: string
*            phone:
*              type: number
*            email:
*              type: string
*            addresslineone:
*              type: string
*            addresslinetwo:
*              type: string
*            states:
*              type: number
*            pincode:
*              type: number
*            country:
*              type: number
*            city:
*              type: string
*            distric:
*              type: string
*            udisecode:
*              type: string
*            serviceengid:
*              type: number
*            smartclass:
*              type: number
*            blockid:
*              type: number
*            pid:
*              type: number
*            password:
*              type: string
*            password_confirmation:
*              type: string
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
 * /api/admin/manage-school:
 *  get:
 *   tags:
 *    - Admin School Manage
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
 * /api/admin/manage-school/{id}:
 *  delete:
 *   tags:
 *    - Admin School Manage
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
 * /api/admin/manage-school/{id}:
 *  get:
 *   tags:
 *    - Admin School Manage
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
 * /api/admin/equipment-by-school-id/{id}:
 *  get:
 *   tags:
 *    - Admin School Manage
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