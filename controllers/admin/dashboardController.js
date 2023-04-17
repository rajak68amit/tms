/*jslint node: true */
/* jshint esversion: 8 */
/*jshint -W033 */
require("express-async-errors");
var Sequelize = require('sequelize');
const { projects, tickets, trainings, reports, user, roles, states, countrys, citys } = require('../../models');
const statusCodes = require('../../utils/responseCode');
const { successHandler, sortHandler, catcherrHandler } = require('../../middleware/validation-middleware');

module.exports = {
    /* on dashboard count report ticket , projects , training  */
    async countReports(req, res) {
        try {
            const totalComplain = await tickets.count({
                where: {
                    isActive: 1,
                }
            });
            const totalProjects = await projects.count({
                where: {
                    isActive: 1,
                }
            });
            const trainingsCount = await trainings.count({
            });
            const reportsCount = await reports.count({
                attributes: [[Sequelize.fn("COUNT", Sequelize.col("reports.id")), "totalReports"]],
                where: {
                    isActive: 1,
                }
            });
            const project = { totalComplain, totalProjects, trainingsCount, reportsCount }
            const data = { statusCodes: statusCodes.ok, msg: "Count Reports Lists!", data: project, success: true }
            successHandler(res, data)
        } catch (error) {
            const data = { statusCodes: statusCodes.Internalservererror, error: error.message, msg: "Something went wrong!", success: false }
            catcherrHandler(res, data)
        }
    },
    /* service engineer count report  */
    async serviceEngReports(req, res) {
        try {
            const serviceEngineer = await user.findAll({
                attributes: ['id', 'roleid', 'name'],
                group: ["id"],
                include: [{
                    attributes: ['id', 'supervisorid', [Sequelize.fn("COUNT", Sequelize.col("ticket.scode")), "totalschool"], [Sequelize.fn("COUNT", Sequelize.col("ticket.id")), "totaltickets"]],
                    model: tickets,
                    where: {
                        isActive: 1,
                    },
                },
                {
                    attributes: ['id', 'name'],
                    model: roles,
                    where: {
                        id: 2,
                    },
                },
                ],

            });

            const data = { statusCodes: statusCodes.ok, msg: "Service Engineers Lists!", data: serviceEngineer, success: true }
            successHandler(res, data)
        } catch (error) {
            const data = { statusCodes: statusCodes.Internalservererror, error: error.message, msg: "Something went wrong!", success: false }
            catcherrHandler(res, data)
        }
    },
    /* projects report  */
    async projectsReports(req, res) {
        try {
            const projectsReports = await projects.findAll({
                group: ["id"],

                attributes: ['id','name', 'details', 'details', 'startDate', 'endDate'],
            });
            const data = { statusCodes: statusCodes.ok, msg: "Projects Lists!", data: projectsReports, success: true }
            successHandler(res, data)
        } catch (error) {
            const data = { statusCodes: statusCodes.Internalservererror, error: error.message, msg: "Something went wrong!", success: false }
            catcherrHandler(res, data)
        }
    },
    /* country and state  */
    /* user listing  */
    /// GET API to fetch all added user Details.
    /**
     * fetch all added country Details
     * @route GET /api/admin/country-details:
     * @api public[temp demo]
     * @param {object} req
     * @param {object} res
     * @return {error|json}
     * @author TMS TEAM
     */

    /**
     * @swagger
     * /api/admin/country-details:
     *  get:
     *   tags:
     *    - Country Listing 
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
    async countryDetails(req, res) {
        
            const Countrysdata = await countrys.findAll({
                attributes: ['id','name'],
                include: [{
                    model: states, attributes: ['id','name'],
                    include: [{
                        model: citys, attributes: ['id', 'name'] 
                    }]
                }, 
                ]
            });
            const data = { statusCodes: statusCodes.ok, msg: "Country details List!", data: Countrysdata, success: true }
            successHandler(res, data)
        try { } catch (error) {
            const data = { statusCodes: statusCodes.Internalservererror, error: error.message, msg: "Something went wrong!", success: false }
            catcherrHandler(res, data)
        }
    }
}