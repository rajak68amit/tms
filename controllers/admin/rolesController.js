/*jslint node: true */
/* jshint esversion: 8 */
/*jshint -W033 */
require("express-async-errors");
const { roles } = require('../../models');
var { Sequelize, Op, QueryTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const statusCodes = require('../../utils/responseCode');
const { successHandler, sortHandler, catcherrHandler, successHandlerpaginate } = require('../../middleware/validation-middleware');
module.exports = {
    /* create role   */
    async roleCreate(req, res) {
        try {
            req.body.isActive = 1;
            req.body.isDelete = 0;
            const addrole = new roles(req.body);
            await addrole.save()
            const data = { statusCodes: statusCodes.Created, msg: "Role created successfully!", success: true }
            sortHandler(res, data)
        } catch (error) {
            const data = { statusCodes: statusCodes.Internalservererror, error: error.message, msg: "Something went wrong!", success: false }
            catcherrHandler(res, data)
        }
    },
    async updaterole(req, res) {
        try {
            const roleid = req.params.id;
            const role_code = await roles.findOne({
                attributes: ["id"],
                where: { id: roleid }
            })
            if (!role_code) {
                const data = { msg: "Enter id does not exist", statusCodes: statusCodes.Notfound, success: false }
                return sortHandler(res, data)
            }
            req.body.isActive = 1;
            const {
                name,
            } = req.body
        await roles.update({
                name: name,
            }, {
                where: {
                    id: roleid,
                }
            });
            const data = { statusCodes: statusCodes.PartialContent, msg: "Role update successfully!", success: true }
            sortHandler(res, data)
         } catch (error) {
            const data = { statusCodes: statusCodes.Internalservererror, error: error.message, msg: "Something went wrong!", success: false }
            catcherrHandler(res, data)
        }
    },
    async singleRole(req, res) {
        try {
            req.body.isActive = 1;
            const roleid = req.params.id || req.body.id;
            console.log(`Role ${roleid}`)
            const rolesdetails =   await roles.findOne({
                attributes: ['id', 'name', 'isActive'],
                where: {
                    id: roleid, isActive:1
                }
            });
            const data = { statusCodes: statusCodes.Created, msg: "Role details!", data: rolesdetails, success: true }
            successHandler(res, data)
         } catch (error) {
            const data = { statusCodes: statusCodes.Internalservererror, error: error.message, msg: "Something went wrong!", success: false }
            catcherrHandler(res, data)
        }
    },

    /* listing all role */
    async roleslists(req, res) {
        try {
            const limit = 20;
            let whereClause;
            let sortby = req.query.sortby || 'name';
            let sort = req.query.sort || 'asc';
            if (req.query.search && req.query.search != '') {
                const search = req.body.search || req.query.search
                const status = req.query.status;
                whereClause = {
                    [Op.or]: [
                        { 'name': { [Op.like]: `%${search}%` } },
                        { 'isActive': { [Op.eq]: status || 1 } },
                    ]
                };
            }
            let ordersort = [[sortby, sort]];
            let page = parseInt(req.query.page) || 1;
            let offset = 0 + (page - 1) * limit;
            const rolesdata = await roles.findAll({
                attributes: ['id', 'name', 'isActive'],
                where: whereClause,
                offset: offset,
                limit: limit,
                order: ordersort
            });
            const roleCount = await roles.count({
                where: whereClause,
            })
            const pagingData = { total: roleCount, per_page: page }
            const data = { statusCodes: statusCodes.ok, msg: "Role Lists!", data: rolesdata, success: true, page: pagingData }
            successHandlerpaginate(res, data)
         } catch (error) {
            const data = { statusCodes: statusCodes.Internalservererror, error: error.message, msg: "Something went wrong!", success: false }
            catcherrHandler(res, data)
        }
    },
    /*user list by role  */
    async userslistsbysearch(req, res) {
        const role = req.query.role;
        const status = req.query.status;
        const users = await User.findAll({
            attributes: ['id', 'roleid', 'name', 'phone', 'email'],
            where: {
                isActive: status || 1,
            },
            include: [{
                attributes: ['name'],
                model: roles,
                where: {
                    name: role,
                },
            }],
        });
        const data = { statusCodes: statusCodes.ok, msg: "User Lists!", data: users, success: true }
        successHandler(res, data)
        throw new Error("Something went wrong!");
    },/* update user profiles */
    async update(req, res) {
        const id = req.params.id
        const {
            name,
            roleid,
            phone, email
        } = req.body
        await user.update({
            name: name,
            roleid: roleid,
            phone: phone,
            email: email,
        }, {
            where: {
                id: id,
            }
        });
        const data = { statusCodes: statusCodes.PartialContent, msg: "School Complains Lists!", data: data, success: true }
        successHandler(res, data)
        throw new Error("Something went wrong!");
    },/* user details by id */
    async singleuser(req, res) {
        const id = req.params.id;
        const user = await user.findOne({
            attributes: ['id', 'roleid', 'name', 'phone', 'email', 'isActive', 'lastlogin'],
            where: {
                id: id,
            }
        });
        const data = { statusCodes: statusCodes.ok, msg: "User Detail!", data: user, success: true }
        successHandler(res, data)
        throw new Error("Something went wrong!");
    },/* delete role by roleid */
    async deleterole(req, res) {
        const roleId = req.params.id;
        const userid = await roles.findOne({
            attributes: ["id"],
            where: { id: roleId }
        })
        if (!userid) {
            const data = { msg: "Enter id does not exist", statusCodes: statusCodes.Notfound, success: false }
            return sortHandler(res, data)
        }
        await roles.destroy({
            where: { id: roleId }
        });
        const data = { msg: "delete Successfully", statusCodes: statusCodes.ok, success: true }
        sortHandler(res, data);
        throw new Error("Something went wrong!");
    },
    /* email testing  */
    async email(req, res) {
        var transporter = nodemailer.createTransport({
            host: process.env.MHost,
            port: process.env.MPORT,
            auth: {
                user: process.env.MUSERNAME,
                pass: process.env.MPASSWORD
            }
        });
        const mailData = {
            from: 'youremail@gmail.com',
            to: "amitkumarrajak68@gmail.com",
            subject: "hello",
            text: "hello man ",
            html: '<b>Hey there! </b><br> This is our first message sent with Nodemailer<br/>',
        };
        const email = transporter.sendMail(mailData, (error, info) => {
            if (error) {
                const data = { statusCodes: statusCodes.PreconditionFailed, error: error.message, msg: "Something went wrong!", success: false }
                catcherrHandler(res, data)
            }
            const data = { statusCodes: statusCodes.ok, msg: "Email send", data: info.messageId, success: true }
            successHandler(res, data)
        });
        throw new Error("Something went wrong!");
    }
}