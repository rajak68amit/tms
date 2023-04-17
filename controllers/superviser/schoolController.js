const { user, address, tickets, schools, engsupervisermappings, equipmetmappings } = require('../../models');
const statusCodes = require('../../utils/responseCode');
var { Sequelize, Op } = require('sequelize');
const { successHandler, sortHandler, catcherrHandler,  } = require('../../middleware/validation-middleware');
module.exports = {
    async school(req, res) {
        try {
            
            let whereClause={};
            let required=false
            if (req.query.search && req.query.search != '') {
                const search = req.body.search || req.query.search
                whereClause = {
                    [Op.or]: [
                        { 'udisecode': { [Op.like]: `%${search}%` } },
                    ],
                };
                 required=false
            }
            const schooldetails = await engsupervisermappings.findAll({
            attributes: [],
            where: { sid: req.user},
            include: [{
                attributes: ["name","udisecode"],
                model: schools,
                include: [{ 
                    attributes: ['id',[Sequelize.fn("COUNT", Sequelize.col("eqpid")), "totalequipment"]],
                    required:false,
                    model: equipmetmappings, as: 'participatingequipmetmappings' }],
                    where: whereClause
            }
        ],
        group: ["schools.udisecode"],
        });
            const data = { statusCodes: statusCodes.ok, msg: "School List!", data: schooldetails, success: true }
        successHandler(res, data)
    } catch(error) {
        const data = { statusCodes: statusCodes.Internalservererror, error: error.message, msg: "Something went wrong!", success: false }
        catcherrHandler(res, data)
    }
    },


}