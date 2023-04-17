/*jslint node: true */
/* jshint esversion: 8 */
/*jshint -W033 */
require("express-async-errors");
var { sequelize, Op } = require('sequelize');
const { schools, tickets, blocks, view_sch_complains } = require('../../models');
const statusCodes = require('../../utils/responseCode');
const { successHandler, sortHandler, catcherrHandler, successHandlerpaginate } = require('../../middleware/validation-middleware');
module.exports = {
    /*ticket wise complain list with school listing  */
    /// GET API to fetch all added user Details.
    /**
     * fetch all added user Complains
     * @route GET /api/admin/complains:
     * @api public[temp demo]
     * @param {object} req
     * @param {object} res
     * @return {error|json}
     * @author TMS TEAM
     */

    /**
     * @swagger
    * /api/admin/complains:
     *  get:
     *   tags:
     *    - Complain Listing 
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

    async complain(req, res) {
        try { 
        let whereClause ={};
        let sortby = req.query.sortby || 'userid';
        let sort = req.query.sort || 'asc';
        let gstatus = req.query.status || 'open';
        if (req.query.search && req.query.search != '') {
            const search = req.body.search || req.query.search
           whereClause  = {
                [Op.or]: [
                    { 'block_name': { [Op.like]: `%${search}%` } },
                    { 'schools_name': { [Op.like]: `%${search}%` } },
                    { 'ticketid': { [Op.like]: `%${search}%` } },
               ],
                status: { [Op.like]: gstatus }
            };
        }else if (req.query.status && req.query.status != '') {
            const search = req.body.status || req.query.status
           whereClause  = {
                status: { [Op.like]: gstatus }
            };
        }
        const limit = 20;
        let ordersort = [[sortby, sort]];
        let page = parseInt(req.query.page) || 1;
        let offset = 0 + (page - 1) * limit;
            const complain = await view_sch_complains.findAll({
                attributes: ["created_date", "status", ["ticketid", "ticket_id"], "block_name", "schools_name", "issues_details", ["assignTo", "assign_to"], ["isActive", "is_Active"]],
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
         } catch(error) {
        const data = { statusCodes: statusCodes.Internalservererror, error: error.message, msg: "Something went wrong!", success: false }
        catcherrHandler(res, data)
    }
       // throw new Error("Something went wrong!");
    },
    async complainfilterbyblock(req, res) {
        let condition = {};
        const blockName = req.body.block_name || req.query.block_name
        const limit = 2;
         let page = parseInt(req.query.page) || 1;
        let offset = 0 + (page - 1) * limit;
            const blocknameExist = await view_sch_complains.findOne({
                attributes: ['block_name'],
                where: { block_name: blockName }
            });
            if (!blocknameExist) {
                const data = { msg: "Block name not Found!", statusCodes: statusCodes.PreconditionFailed, success: false }
                sortHandler(res, data);
            }
        const option = {
            [Op.or]: [
                { 'block_name': { [Op.like]: `%${blockName}%` } },
            ]
        }
        condition = option
            const complain = await view_sch_complains.findAll({
                attributes: ["ticketid", "created_date", "block_name", "issues_details","assignTo"],
                where: condition,
                offset: offset,
                limit: limit,
            })
            const view_sch_complainsCount = await view_sch_complains.count(
                {
                    where: condition
                }
            )
        const pagingData = { total: view_sch_complainsCount, per_page: limit }
        const data = { statusCodes: statusCodes.ok, msg: "Complains Lists!", data: complain, success: true, page: pagingData }
        successHandlerpaginate(res, data)
        throw new Error("Something went wrong!");
    },
    async democomplain(req, res) {
            const status = req.query.status;
            const complains = await tickets.findAll({
                attributes: ["details", "ticketid", "serviceengid"],
                where: { isActive: 1 },
                include: [{
                    attributes: ['udisecode'],
                    model: schools,
                    include: [{ attributes: ["name"], model: blocks }]
                },
                    // {
                    // model: Users
                    // },
                ], offset: skipValue,
                limit: limitValue,
            })

            const data = { statusCodes: statusCodes.ok, msg: "Complains Lists!", data: complains ,success:true }
            successHandler(res, data)

        throw new Error("Something went wrong!");
    },
    /* school wise complain list  */
    async schoolwisecomplain(req, res) {
            const status = req.params.status;
            const id = req.params.id;
            const schoolcomplains = await schools.findAll({
                attributes: [
                    "id",
                    "userid",
                    "name",
                    "state",
                    "city",
                    "district",
                    "pincode",
                    "blockid",

                ],
                where: {
                    isActive: status ? status : 1, id: id
                },
                include: [{
                    model: tickets,
                    attributes: [
                        "userid",
                        "details",
                        "ticketid",
                        "supervisorid",
                        "serviceengid",
                        "isActive"
                    ],
                    where: {
                        isActive: status ? status : 1
                    }
                }],
            });
            const data = { statusCodes: statusCodes.ok, msg: "School Complains Lists!", data: schoolcomplains ,success:true }
            successHandler(res, data)
            throw new Error("Something went wrong!");
    }
}




