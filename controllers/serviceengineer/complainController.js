/*jslint node: true */
/* jshint esversion: 8 */
/*jshint -W033 */
require("express-async-errors");
const { user, tickets, schools, equipments } = require('../../models');
const statusCodes = require('../../utils/responseCode');
const { successHandler, sortHandler, catcherrHandler } = require('../../middleware/validation-middleware');
module.exports = {
    /* complain Request  */
    async complainRequest(req, res) {
        try {
            const status = req.params.status;
            const id = req.params.id;
            const profile = await tickets.findAll({
                attributes: [
                    "ticketid",
                    "createdAt",
                    "isActive",
                    "status"
                ],
                where: {
                    isActive: status ? status : 1, serviceengid: req.user
                },
                include: [{
                    model: schools,
                    attributes: ["name"],
                    include: [
                        {
                            model: equipments,
                            attributes: ['name']
                        }
                    ]
                }],
            });
            const data = { statusCodes: statusCodes.ok, msg: "complain Request Details!", data: profile, success: true }
            successHandler(res, data)
        } catch (error) {
            const data = { statusCodes: statusCodes.Internalservererror, error: error.message, msg: "Something went wrong!", success: false }
            catcherrHandler(res, data)
        }
    }
}