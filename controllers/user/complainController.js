/*jslint node: true */
/* jshint esversion: 8 */
/*jshint -W033 */
require("express-async-errors");
var { sequelize, Op } = require('sequelize');
const { schools, tickets, equipments, view_sch_complains } = require('../../models');
const statusCodes = require('../../utils/responseCode');
const { successHandler, sortHandler, catcherrHandler, successHandlerpaginate } = require('../../middleware/validation-middleware');
module.exports = {
  
    async complain(req, res) {
        const limit = 2;
        let page = (parseInt(req.query.page)) ? parseInt(req.params.page) : 1;
        let offset = 0 + (page - 1) * limit;
        console.log("found", req.user);
        const complain = await view_sch_complains.findAll({
            attributes: ["ticketid", "created_date", "block_name", "issues_details", "assignTo"],
            where: { userid: req.user },
            offset: offset,
            limit: limit,
        })
        const view_sch_complainsCount = await view_sch_complains.count({ where: { userid: req.user } })
        const pagingData = { total: view_sch_complainsCount, per_page: limit }

        const data = { statusCodes: statusCodes.ok, msg: "Complains Lists!", data: complain, success: true, page: pagingData }
        successHandlerpaginate(res, data)
        throw new Error("Something went wrong!");
    },
    async addComplain(req, res) {
        try {
            req.body.isActive = 1;
            req.body.supervisorid = req.getsuperviserid;
            req.body.serviceengid = req.getserviceid;
            req.body.scode = req.sidcode;
            req.body.details = req.body.details;
            req.body.status = 'open';
            req.body.ticketid = Math.floor(Math.random() * 9000 + 1000); // 1289
            req.body.userid = req.user;
            req.body.equipmentid = req.body.equipmentId;
            const addcomplain = new tickets(req.body);
            await addcomplain.save()
            const data = { statusCodes: statusCodes.Created, msg: "Complain created successfully!", success: true }
            sortHandler(res, data)
        } catch (error) {
            const data = { statusCodes: statusCodes.Internalservererror, error: error.message, msg: "Something went wrong!", success: false }
            catcherrHandler(res, data)
        }
    },

    async update(req, res) {
        try {
            const complainId = req.params.id
            const complainexit = await tickets.findOne({
                attributes: ["id"],
                where: { id: complainId, userId: req.user, }
            })
            if (!complainexit) {
                const data = { msg: "Enter id does not exist!", statusCodes: statusCodes.Notfound, success: false }
                return sortHandler(res, data)
            }
            const {
                details,
                equipmentId,
            } = req.body
            await tickets.update({
                details: details,
                equipmentid: equipmentId,
            }, {
                where: { id: complainId, userId: req.user, }
            });
            const data = { statusCodes: statusCodes.Created, msg: "Complain updated successfully!", success: true }
            sortHandler(res, data)
        } catch (error) {
            const data = { statusCodes: statusCodes.Internalservererror, error: error.message, msg: "Something went wrong!", success: false }
            catcherrHandler(res, data)
        }
    },
    async Complainlist(req, res) {
        try {
            
            const addcomplain = await tickets.findAll({ 
                attributes: ["ticketid", "createdAt", "details","status"],
                where: { userid: req.user },
                include: [{
                    model: equipments,
                    attributes: ["name"],
                }]
            });
            const data = { statusCodes: statusCodes.ok, msg: "Complain Lists",data: addcomplain, success: true }
            successHandler(res, data)
        } catch (error) {
            const data = { statusCodes: statusCodes.Internalservererror, error: error.message, msg: "Something went wrong!", success: false }
            catcherrHandler(res, data)
        }
    },
    async singlecomplain(req, res) {
        try {
            const complainId = req.params.id
            console.log("complainId")
            const complainexit = await tickets.findOne({
                attributes: ["id"],
                where: { id: complainId, userId: req.user, }
            })
            if (!complainexit) {
                const data = { msg: "Enter id does not exist", statusCodes: statusCodes.Notfound, success: false }
                return sortHandler(res, data)
            }
            const complainDetails = await tickets.findOne({ 
                attributes: ["ticketid", "createdAt", "details","status"],
                where: { userid: req.user, id: complainId },
                include: [{
                    model: equipments,
                    attributes: ["name"],
                }]
            });
            const data = { statusCodes: statusCodes.ok, msg: "Complain details",data: complainDetails, success: true }
            successHandler(res, data)
        } catch (error) {
            const data = { statusCodes: statusCodes.Internalservererror, error: error.message, msg: "Something went wrong!", success: false }
            catcherrHandler(res, data)
        }
    },
    
    async delete(req, res) {
        try {
            const complainId = req.params.id
            const complainexit = await tickets.findOne({
                attributes: ["id"],
                where: { id: complainId, userId: req.user, }
            })
            if (!complainexit) {
                const data = { msg: "Enter id does not exist", statusCodes: statusCodes.Notfound, success: false }
                return sortHandler(res, data)
            }
            await tickets.destroy({ where: { id: complainId } });
            const data = { statusCodes: statusCodes.ok, msg: "Delete successfully", success: true }
            sortHandler(res, data)
        } catch (error) {
            const data = { statusCodes: statusCodes.Internalservererror, error: error.message, msg: "Something went wrong!", success: false }
            catcherrHandler(res, data)
        }
    }
}