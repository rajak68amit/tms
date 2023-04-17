/*jslint node: true */
/* jshint esversion: 8 */
/*jshint -W033 */
const { user } = require('../models');
const statusCodes = require('../utils/responseCode');
module.exports = {
    async adminOnly(req, res, next) {
        const data = await user.findOne({
            attributes: ['roleid'],
            where: {
                id: req.user
            }
        });
        const roleId = data.roleid;
        if (roleId != 1) {
            return res.status(statusCodes.Unauthorized).json({
                message: 'You are Unauthorized !',
            })
        }
        next();
    },
    async superviserOnly(req, res, next) {
        const data = await user.findOne({
            attributes: ['roleid'],
            where: {
                id: req.user
            }
        });
        const roleId = data.roleid;
        if (roleId != 3) {
            return res.status(statusCodes.Unauthorized).json({
                message: 'You are Unauthorized !',
            })
        }
        next();
    },
    async serviseengOnly(req, res, next) {
        const data = await user.findOne({
            attributes: ['roleid'],
            where: {
                id: req.user
            }
        });
        const roleId = data.roleid;
        if (roleId != 2) {
            return res.status(statusCodes.Unauthorized).json({
                message: 'You are Unauthorized !',
            })
        }
        next();
    },
    async customerOnly(req, res, next) {
        const data = await user.findOne({
            attributes: ['roleid'],
            where: {
                id: req.user
            }
        });
        const roleId = data.roleid;
        if (roleId != 5) {
            return res.status(statusCodes.Unauthorized).json({
                message: 'You are Unauthorized !',
            })
        }
        next();
    },
    async userOnly(req, res, next) {
        const data = await user.findOne({
            attributes: ['roleid'],
            where: {
                id: req.user
            }
        });
        const roleId = data.roleid;
        if (roleId != 4) {
            return res.status(statusCodes.Unauthorized).json({
                message: 'You are Unauthorized !',
            })
        }
        next();
    }
}