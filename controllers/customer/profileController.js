/*jslint node: true */
/* jshint esversion: 8 */
/*jshint -W033 */
require("express-async-errors");
const { user, address } = require('../../models');
const statusCodes = require('../../utils/responseCode');
const { successHandler, sortHandler, catcherrHandler } = require('../../middleware/validation-middleware');
module.exports = {
    /* custome profile  */
    async profile(req, res) {
        try{
            const status = req.params.status;
            const id = req.params.id;
        const profile = await user.findAll({
                attributes: [
                    "id",
                    "roleid",
                    "name",
                    "phone",
                    "email"
                ],
                where: {
                    isActive: status ? status : 1, id: req.user
                },
                include: [{
                    model: address,
                    attributes: [
                        "addressone",
                        "addresstwo",
                        "state",
                        "country",
                        "city",
                        "pincode",
                        "district",
                        "landmark"
                    ],

                    where: {
                        isActive: status ? status : 1,
                    }
                }],
            });
            const data = { statusCodes: statusCodes.ok, msg: "Profile Details!", data: profile ,success:true }
            successHandler(res, data)
    } catch(error) {
        const data = { statusCodes: statusCodes.Internalservererror, error: error.message, msg: "Something went wrong!", success: false }
        catcherrHandler(res, data)
    }
    }, async update(req, res) {
            const {
                name,
                phone,
            } = req.body
        await user.update({
                name: name,
                phone: phone,
            }, {
                where: {
                    id: req.user
                }
            });
        const data = { statusCodes: statusCodes.PartialContent, msg: "Profile Updated Successfully!", success: true }
            sortHandler(res, data)
        throw new Error("Something went wrong!");

    }
}