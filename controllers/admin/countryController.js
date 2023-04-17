/*jslint node: true */
/* jshint esversion: 8 */
/*jshint -W033 */
require("express-async-errors");
var { sequelize, Op } = require('sequelize');
const { countrys, states } = require('../../models');
const statusCodes = require('../../utils/responseCode');
const { successHandler, sortHandler, catcherrHandler, successHandlerpaginate } = require('../../middleware/validation-middleware');
module.exports = {
    async country(req, res) {
        try { 
        const countryDetails = await countrys.findAll({
            attributes: ["id","name"]
        })
        const data = { statusCodes: statusCodes.ok, msg: "country Lists!", data: countryDetails, success: true, }
        successHandler(res, data)
        } catch (error) {
            const data = { statusCodes: statusCodes.Internalservererror, error: error.message, msg: "Something went wrong!", success: false }
            catcherrHandler(res, data)
        }
    },
    async state(req, res) {
        console.log("hemant")
        try { 
            const cid = req.params.country_id || req.query.country_id
            console.log("hello",cid);

            const countryExist = await countrys.findOne({
                where: {
                    id: cid
                }
            });
            if (!countryExist) {
                return res.json({
                    msg: 'country id not exists', success: false
                })
            }
            const statesDetails = await states.findAll({
            attributes: ["id","name"],
            where:{cid: cid}
        })
        const data = { statusCodes: statusCodes.ok, msg: "states Lists!", data: statesDetails, success: true, }
        successHandler(res, data)
        } catch (error) {
            const data = { statusCodes: statusCodes.Internalservererror, error: error.message, msg: "Something went wrong!", success: false }
            catcherrHandler(res, data)
        }
    },
}