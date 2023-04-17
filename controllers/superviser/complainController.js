const { user, address, tickets, schools } = require('../../models');
const statusCodes = require('../../utils/responseCode');
const { successHandler, sortHandler, catcherrHandler,  } = require('../../middleware/validation-middleware');
module.exports = {
    async complainRequest(req, res) {
        try {
            const complainRequest = await tickets.findAll({
            attributes: [
                "ticketid",
                "createdAt",
                "serviceengid",
                "status"
            ],
            where: {
                supervisorid: req.user
            },
            include: [{
                attributes: ["udisecode"],
                model: schools,
            },{
                model: user,
                attributes: ["name"]
            }
        ],
            
        });
            const data = { statusCodes: statusCodes.ok, msg: "complain Details!", data: complainRequest, success: true }
        successHandler(res, data)
    } catch(error) {
        const data = { statusCodes: statusCodes.Internalservererror, error: error.message, msg: "Something went wrong!", success: false }
        catcherrHandler(res, data)
    }
    },


}