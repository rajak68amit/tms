const { user, address, pmreports, schools, engsupervisermappings, equipmetmappings } = require('../../models');
const statusCodes = require('../../utils/responseCode');
var { Sequelize, Op } = require('sequelize');
const { successHandler, sortHandler, catcherrHandler, } = require('../../middleware/validation-middleware');
module.exports = {
    async pmreports(req, res) {
        try {
            let whereClause = {};
            if (req.query.search && req.query.search != '') {
                const search = req.body.search || req.query.search
                whereClause = {
                    [Op.or]: [
                        { 'name': { [Op.like]: `%${search}%` } },
                    ],
                };
            }
            const schooldetails = await engsupervisermappings.findAll({
                attributes: [],
                where: { sid: req.user },
                include: [{
                    attributes: ["udisecode", "name"],
                    model: schools,
                    where: whereClause,
                    include: [{
                        attributes: ["year", "qone_date", "qone_url", "qtwo_date", "qtwo_url", "qthree_date", "qthree_url", "qfour_date", "qfour_url"],
                        model: pmreports
                    }]
                 }],
                group: ["schools.udisecode"],
            });
            const data = { statusCodes: statusCodes.ok, msg: "Pmreports List!", data: schooldetails, success: true }
            successHandler(res, data)
        } catch (error) {
            const data = { statusCodes: statusCodes.Internalservererror, error: error.message, msg: "Something went wrong!", success: false }
            catcherrHandler(res, data)
        }
    },


}