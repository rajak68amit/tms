/*jslint node: true */
/* jshint esversion: 8 */
/*jshint -W033 */
require("express-async-errors");
var { sequelize, Op } = require('sequelize');
const { trainings } = require('../../models');
const statusCodes = require('../../utils/responseCode');
const { successHandler, sortHandler, catcherrHandler, successHandlerpaginate } = require('../../middleware/validation-middleware');
module.exports = {

    // add training request
    async addTrainingRequest(req, res) {
            req.body.isActive = 1;
            req.body.isDelete = 0;
            req.body.scode = req.user;
            const training = new trainings(req.body);
            await training.save()
            const data = { statusCodes: statusCodes.Created, msg: "Training Request Added successfully!", success: true }
            sortHandler(res, data)
            throw new Error("Something went wrong!");
    }, // listing training requests
    async listTrainingRequest(req, res) {
            const trainingRequestlist = await trainings.findAll({
                attributes: ['id', 'subject','date'],
                where: {
                    isActive: 1,
                    scode: req.user
                }
            });
          
            const data = { statusCodes: statusCodes.Created, msg: "Training Request Lists!", data: trainingRequestlist,success: true }
            successHandler(res, data)
            throw new Error("Something went wrong!");
    }, // update training request
    async singleTrainingRequest(req, res) {
        const trainingrequestId = req.params.id
        const idExist = await trainings.findOne({
            attributes: ['id'],
            where: { id: trainingrequestId, scode: req.user }
        });
        if (!idExist) {
            const data = { msg: "Enter Id not found!", statusCodes: statusCodes.PreconditionFailed, success: false }
            sortHandler(res, data);
        }
            const trainingRequestlist = await trainings.findOne({
                attributes: ['id', 'subject','date'],
                where: {
                    isActive: 1,
                    scode: req.user, id: trainingrequestId
                }
            });
          
            const data = { statusCodes: statusCodes.Created, msg: "Training Request Lists!", data: trainingRequestlist,success: true }
            successHandler(res, data)
            throw new Error("Something went wrong!");
    }, // update training request
    async updateTrainingRequest(req, res) {
        const trainingrequestId = req.params.id
            const idExist = await trainings.findOne({
                attributes:['id'],
                where: { id: trainingrequestId, scode: req.user }
            });
            if (!idExist) {
                const data = { msg: "Enter Id not found!", statusCodes: statusCodes.PreconditionFailed, success: false }
                sortHandler(res, data);
            }
            const {
                subject,
                date,
            } = req.body
            await trainings.update({
                subject: subject,
                date: date,
            }, {
                where: {
                    id: trainingrequestId, scode: req.user
                }
            });
        const data = { statusCodes: statusCodes.PartialContent, msg: "Training Request updated successfully!!",success: false }
            sortHandler(res, data)
            throw new Error("Something went wrong!");
    },/// delete training request
    async deleteTrainingRequest(req, res) {
        const trainingrequestId = req.params.id
            const idExist = await trainings.findOne({
                where: { id: trainingrequestId, scode: req.user }
            });
            if (!idExist) {
                const data = { msg: "Enter Id not found!", statusCodes: statusCodes.PreconditionFailed, success: false }
                sortHandler(res, data);
            }
           await trainings.destroy({
                where: {
                    id: trainingrequestId,
                }
            });
            const data = { msg: "delete Successfully", statusCodes: statusCodes.ok, success: true }
            sortHandler(res, data);
            throw new Error("Something went wrong!");
    }

}