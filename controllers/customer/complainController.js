/*jslint node: true */
/* jshint esversion: 8 */
/*jshint -W033 */
require("express-async-errors");
var { sequelize, Op } = require('sequelize');
const { user, tickets, view_sch_complains } = require('../../models');
const statusCodes = require('../../utils/responseCode');
const { successHandler, successHandlerpaginate,sortHandler, catcherrHandler } = require('../../middleware/validation-middleware');
module.exports = {
    /* complain details  */
    async complainlist(req, res) {
        try {
            let whereClause = {};
            let sortby = req.query.sortby || 'userid';
            let sort = req.query.sort || 'asc';
            let gstatus = req.query.status || 'open';
            if (req.query.search && req.query.search != '') {
                const search = req.body.search || req.query.search
                whereClause = {
                    [Op.or]: [
                        { 'ticketid': { [Op.like]: `%${search}%` } },
                    ],
                    status: { [Op.like]: gstatus }
                };
            } else if (req.query.status && req.query.status != '') {
                  whereClause = {
                    status: { [Op.like]: gstatus }
                };
            }
            const limit = 20;
            let ordersort = [[sortby, sort]];
            let page = parseInt(req.query.page) || 1;
            let offset = 0 + (page - 1) * limit;
            const complain = await view_sch_complains.findAll({
                attributes: ["created_date", "status", ["ticketid", "ticket_id"], "issues_details", ["isActive", "is_Active"]],
                where: whereClause,
                offset: offset,
                limit: limit,
                order: ordersort
            })
            const view_sch_complainsCount = await view_sch_complains.count({
                where: whereClause,
            }
            )

            const pagingData = { total: view_sch_complainsCount, per_page: page }

            const data = { statusCodes: statusCodes.ok, msg: "Complains Lists!", data: complain, success: true, page: pagingData }
            successHandlerpaginate(res, data)
        } catch (error) {
            const data = { statusCodes: statusCodes.Internalservererror, error: error.message, msg: "Something went wrong!", success: false }
            catcherrHandler(res, data)
        }
        // try {
        //     const complainlists = await tickets.findAll({
        //         attributes: [
        //             "createdAt",
        //             "ticketid",
        //             "details",
        //             "status",
        //         ],
        //         where: { isActive:  1},
        //     });
        //     const data = { statusCodes: statusCodes.ok, msg: "Complain List!", data: complainlists, success: true }
        //     successHandler(res, data)
        // } catch (error) {
        //     const data = { statusCodes: statusCodes.Internalservererror, error: error.message, msg: "Something went wrong!", success: false }
        //     catcherrHandler(res, data)
        // }
    },
    async addComplain(req, res) {
        try{
               const complain = {
                'isActive':1,
               'supervisorid':req.getsuperviserid,
               'serviceengid': req.getserviceid,
               'scode': req.body.scode,
               'details': req.body.details,
               'ticketid': Math.floor(Math.random() * 9000 + 1000),
               'equipmentid': req.body.equipmentId,
               'status': 'opne',
               'userid': req.user,
           }
        // req.body.isActive = 1;
        // req.body.supervisorid = req.getsuperviserid;
        // req.body.serviceengid = req.getserviceid;
        // req.body.status = 'open';
        // req.body.ticketid = Math.floor(Math.random() * 9000 + 1000); // 1289
        // req.body.userid = req.user;
        // req.body.equipmentid = req.body.equipmentId;
        const addcomplain = new tickets(complain);
        await addcomplain.save()
        const data = { statusCodes: statusCodes.Created, msg: "Complain created successfully!", success: true }
        sortHandler(res, data)
    } catch(error) {
        const data = { statusCodes: statusCodes.Internalservererror, error: error.message, msg: "Something went wrong!", success: false }
        catcherrHandler(res, data)
    }
       
    }
}

/**
    * fetch all added user Complains
    * @route GET /api/customer:
    * @api public[temp demo]
    * @param {object} req
    * @param {object} res
    * @return {error|json}
    * @author TMS TEAM
    */
/**
 * @swagger
 * /api/customer/profile:
 *  get:
 *   tags:
 *    - Customer management 
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
 * api/customer/update:
 *  get:
 *   tags:
 *    - Customer management
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
 * /api/customer/manage-complains:
 *  get:
 *   tags:
 *    - Customer management
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
   * /api/customer/manage-complains:
   *  post:
    *   tags:
    *    - Customer management 
    *   requestBody:
    *    description: Add complains
    *    required: true
    *    content:
    *      application/json:
    *        schema:
    *          type: object
    *          properties:
   *            scode:
   *              type: number
   *            details:
   *              type: string
   *            equipmentId:
   *             type: number
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

