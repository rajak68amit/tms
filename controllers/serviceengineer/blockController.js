/*jslint node: true */
/* jshint esversion: 8 */
/*jshint -W033 */
require("express-async-errors");
var { Sequelize, Op } = require('sequelize');
const { blocks, tickets, schools, equipments } = require('../../models');
const statusCodes = require('../../utils/responseCode');
const { successHandler, sortHandler, catcherrHandler } = require('../../middleware/validation-middleware');
module.exports = {
    /* complain Request  */
    async blockschool(req, res) {
        try {
            console.log(req.user)
            const block = await blocks.findAll({
                attributes: [
                    "name",
                ],
                // where: {
                //     serviceengid: req.user
                // },
                include: [{
                    attributes: [[Sequelize.fn("COUNT", Sequelize.col("schools.name")), "totalschool"]],
                    model: schools,
                    where: { serviceengid: req.user },
                    // include: [
                    //     {
                    //         model: equipments,
                    //         attributes: ['name']
                    //     }
                    // ]
                    //groupby: chools.name
                }],
            });
            const data = { statusCodes: statusCodes.ok, msg: "complain Request Details!", data: block, success: true }
            successHandler(res, data)
        } catch (error) {
            const data = { statusCodes: statusCodes.Internalservererror, error: error.message, msg: "Something went wrong!", success: false }
            catcherrHandler(res, data)
        }
    }
}