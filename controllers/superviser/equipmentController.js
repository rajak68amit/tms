const { user, view_sch_eqp, tickets, schools, engsupervisermappings, equipmetmappings, equipments } = require('../../models');
const statusCodes = require('../../utils/responseCode');
var { Sequelize, Op } = require('sequelize');
const { successHandler, sortHandler, catcherrHandler, } = require('../../middleware/validation-middleware');
module.exports = {
    async equipmentlistbyudice(req, res) {
        try {
            const now = new Date();
            const udisecode = req.params.udisecode || req.query.udisecode;;
            const getudiceCode = await schools.findOne({ where: { udisecode }})
            if (!getudiceCode){
                const data = { statusCodes: statusCodes.Notfound, msg: "udise code not found",  success: false }
                sortHandler(res, data)
            }
            const equipmentlist = await equipments.findAll({
                attributes: ['manufacturerName', 'serialno', 'name', 'warrantyEndDate', [
                    Sequelize.literal(`CASE WHEN DATEDIFF(warrantyEndDate, '${now.toISOString()}') < 1 THEN 'expired' WHEN DATEDIFF('${now.toISOString()}', warrantyEndDate) < 5 THEN 'under warranty' ELSE 'end date' END`),'warantyType']
                ],
               include:[{
                model: schools,
                attributes: [],
                   where: { udisecode: udisecode }
               }]
            });
            const data = { statusCodes: statusCodes.ok, msg: "Schools Lists!", data: equipmentlist, success: true }
            successHandler(res, data)
          } catch (error) {
            const data = { statusCodes: statusCodes.Internalservererror, error: error.message, msg: "Something went wrong!", success: false }
            catcherrHandler(res, data)
        }
    },
   }