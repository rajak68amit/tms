/*jslint node: true */
/* jshint esversion: 8 */
/*jshint -W033 */
require("express-async-errors");
var fs = require('fs');
var { Sequelize, Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const { schools, tickets, blocks, comments, address, user, projects } = require('../../models');
const statusCodes = require('../../utils/responseCode');
const { sequelize } = require('../../models');
const multer = require('multer')
const uploadimage = multer().single('image')
//const upload = require('../../middleware/imageuplode')
const { successHandler, sortHandler, catcherrHandler, successHandlerpaginate } = require('../../middleware/validation-middleware');
module.exports = {
    async addcomment(req, res) {
        try {
            let fileName;
            if (req.file === undefined) {
                filename = ''
            } else {
                fileName = req.file.filename
            }
            await comments.create({
                ticketId: req.body.ticketid,
                image: fileName,
                message: req.body.message,
                userId: req.user,
                isActive: 1,
            })
            const data = { statusCodes: statusCodes.ok, msg: " Comments Added Successfully!", success: true }
            sortHandler(res, data)
        } catch (error) {
            const data = { statusCodes: statusCodes.Internalservererror, error: error.message, msg: "Something went wrong!", success: false }
            catcherrHandler(res, data)
        }
    },
    async allcomments(req, res) {
        try {
            const commentsData = await comments.findAll({
                attributes: [
                    "id", "message", "image",
                ],
                where: {
                    userId: req.user
                }
            });
            const data = { statusCodes: statusCodes.ok, msg: "Comment lists!", data: commentsData, success: true }
            successHandler(res, data)
        } catch (error) {
            const data = { statusCodes: statusCodes.Internalservererror, error: error.message, msg: "Something went wrong!", success: false }
            catcherrHandler(res, data)
        }
    },
    async single(req, res) {
        try {
            const commentId = req.params.id;
            const comment = await comments.findOne({
                attributes: ["id"],
                where: { id: commentId }
            })
            if (!comment) {
                const data = { msg: "Enter id does not exist", statusCodes: statusCodes.Notfound, success: false }
                return sortHandler(res, data)
            }
            const commentsData = await comments.findAll({
                attributes: [
                    "id", "message", "image",
                ],
                where: {
                    userId: req.user, id: commentId
                }
            });
            const data = { statusCodes: statusCodes.ok, msg: "Comment details!", data: commentsData, success: true }
            successHandler(res, data)

        } catch (error) {
            const data = { statusCodes: statusCodes.Internalservererror, error: error.message, msg: "Something went wrong!", success: false }
            catcherrHandler(res, data)
        }
    },
    async updatecomment(req, res) {
        try {
            const commentId = req.params.id;
            
            const comment = await comments.findOne({
                attributes: ["id","image"],
                where: { id: commentId, userId: req.user, }
            })
            filepath = 'uploads/' + comment.image
            if (!comment) {
                const data = { msg: "Enter id does not exist", statusCodes: statusCodes.Notfound, success: false }
                return sortHandler(res, data)
            }
            let fileName;
            if (req.file === undefined) {
                filename = ''
                fs.unlink(`${filepath}`, function (error) {
                    if (error) {
                        throw error;
                    }
                    console.log('Deleted filename', comment.image);
                })
                fileName = req.file.filename
            } else {
                fs.unlink(`${filepath}`, function (error) {
                    if (error) {
                        throw error;
                    }
                    console.log('Deleted filename', comment.image);
                })
                fileName = req.file.filename
            }
            const {
                message, ticketid
            } = req.body
            await comments.update({
                message: message,
                image: fileName,
                ticketId: ticketid,
            }, {
                where: { id: commentId, userId: req.user }
            });
            const data = { statusCodes: statusCodes.Accepted, msg: "Comment updated Successfully", success: true }
            sortHandler(res, data)
        } catch (error) {
            const data = { statusCodes: statusCodes.Internalservererror, error: error.message, msg: "Something went wrong!", success: false }
            catcherrHandler(res, data)
        }
    },

    async delete(req, res) {
        const commentId = req.params.id;
        const comment = await comments.findOne({
            attributes: ["id","image"],
            where: { id: commentId }
        })
        filepath = 'uploads/' + comment.image
        if (!comment) {
            const data = { msg: "Enter id does not exist", statusCodes: statusCodes.Notfound, success: false }
            return sortHandler(res, data)
        }
        fs.unlink(`${filepath}`, function (error) {
            if (error) { throw error;}
            console.log('Deleted filename', comment.image);
        })
        await comments.destroy({ where: { id: commentId } });
        const data = { msg: "Comment deleted Successfully", statusCodes: statusCodes.ok, success: true }
        sortHandler(res, data)
        throw new Error("Something went wrong!");
    },
}