const { user, address, tickets, schools, engsupervisermappings, equipmetmappings, blocks } = require('../../models');
const statusCodes = require('../../utils/responseCode');
var { Sequelize, Op } = require('sequelize');
const { successHandler, sortHandler, catcherrHandler, } = require('../../middleware/validation-middleware');
module.exports = {
    async employee(req, res) {
        try {
            let whereClause = {};
            let required = false
            if (req.query.search && req.query.search != '') {
                const search = req.body.search || req.query.search
                whereClause = {
                    [Op.or]: [
                        { 'udisecode': { [Op.like]: `%${search}%` } },
                    ],
                };
                required = false
            }
            const schooldetails = await engsupervisermappings.findAll({
                attributes: ["id","seid"],
                where: { sid: req.user },
                include: [{
                    attributes: ["name"],
                    model: user,
                    required: false,
                    include: [{
                        attributes: ["city"],
                        model: address,
                    }
                ],
                    where: whereClause
                }
                ,{
                    attributes: ["blockid"],
                    model: schools,
                    include: [{
                        attributes: ["name"],
                        model: blocks,
                    }],
                 }
                ],
            group: ["seid"],
            });
            const data = { statusCodes: statusCodes.ok, msg: "complain Details!", data: schooldetails, success: true }
            successHandler(res, data)
        } catch (error) {
            const data = { statusCodes: statusCodes.Internalservererror, error: error.message, msg: "Something went wrong!", success: false }
            catcherrHandler(res, data)
        }
    },


}