/*jslint node: true */
/* jshint esversion: 8 */
/*jshint -W033 */
var { Sequelize, Op, QueryTypes } = require('sequelize');
const { trainings, schools, blocks, address, projects, user, equipmetmappings } = require('../../models');
const statusCodes = require('../../utils/responseCode');
const { successHandler, sortHandler, catcherrHandler } = require('../../middleware/validation-middleware');

module.exports = {
    async trainings(req, res) {
        try {
            const status = req.query.status;
           
            const training = await trainings.findAll({
                attributes: ['id', 'subject', 'date','isActive'],
                include: [{
                    model: schools,
                    attributes: ['id', 'udisecode', 'name'],
                }],
            });
            const data = { statusCodes: statusCodes.ok, msg: "Training Lists!", data: training, success: true }
            successHandler(res, data)
        } catch (error) {
            const data = { statusCodes: statusCodes.Internalservererror, error: error.message, msg: "Something went wrong!", success: false }
            catcherrHandler(res, data)
        }
    },
    async trainingsrequestbyschoolid(req, res) {
        try {
            const schoolcode = req.params.id;
            const training = await trainings.findAll({
                attributes: ['id', 'scode', 'subject', 'date'],
                include: [{
                    model: schools,
                }],
                where: {
                    scode: schoolcode,
                }
            });
            const data = { statusCodes: statusCodes.ok, msg: "School Complains Lists!", data: training, success: true }
            successHandler(res, data)
        } catch (error) {
            const data = { statusCodes: statusCodes.Internalservererror, error: error.message, msg: "Something went wrong!", success: false }
            catcherrHandler(res, data)
        }
    },
}