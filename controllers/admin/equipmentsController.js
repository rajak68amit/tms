/*jslint node: true */
/* jshint esversion: 8 */
/*jshint -W033 */
require("express-async-errors");
var { Sequelize, Op, QueryTypes } = require('sequelize');
const db = require('../../models');
const statusCodes = require('../../utils/responseCode');
const { successHandler, sortHandler, catcherrHandler, successHandlerpaginate } = require('../../middleware/validation-middleware');
const { blocks, equipmenttypes, equipments, schools, equipmetmappings, view_sch_eqp, projects } = require('../../models');
module.exports = {
    /* all added equipmentt list  */

    async equipmentLists(req, res) {
        try{
            let whereClause = {};
            let sortby = req.query.sortby || 'equipmentName';
            let sort = req.query.sort || 'asc';
            if (req.query.search && req.query.search != '') {
                const search = req.body.search || req.query.search
                whereClause = {
                    [Op.or]: [
                        { 'udisecode': { [Op.like]: `%${search}%` } },
                        { 'projectsname': { [Op.like]: `%${search}%` } },
                    ],
                };
            } 
            const limit = 20;
            let ordersort = [[sortby, sort]];
            let page = parseInt(req.query.page) || 1;
            let offset = 0 + (page - 1) * limit;
          const Equipments = await view_sch_eqp.findAll({
           // attributes: ['name',  'manufacturerName', 'warrantyEndDate'],
            where: whereClause,
            offset: offset,
            limit: limit,
            order: ordersort
        });

            const view_sch_complainsCount = await view_sch_eqp.count({
                where: whereClause,
            })

            const pagingData = { total: view_sch_complainsCount, per_page: page }

            const data = { statusCodes: statusCodes.ok, msg: "Equipmenttypes Lists!", data: Equipments, success: true, page: pagingData }
            successHandlerpaginate(res, data)
    } catch(error) {
        const data = { statusCodes: statusCodes.Internalservererror, error: error.message, msg: "Something went wrong!", success: false }
        catcherrHandler(res, data)
    }
    },/* details of equipment by id */
    /* all added equipmentt list  */
    async equipments(req, res) {
        const status = req.query.status;
        const Equipments = await equipmenttypes.findAll({
            attributes: ['id', 'type', 'details', 'isActive'],
            include: [{
                model: equipments,
                attributes: ['name', 'invoiceDate', 'manufacturerName', 'warrantyEndDate', 'about', 'serialno', 'typeId'],
                where: {
                    isActive: status ? status : 1,
                }
            }],
            where: {
                isActive: status ? status : 1,
            }
        });
        const data = { statusCodes: statusCodes.ok, msg: "Equipmenttypes Lists!", data: Equipments }
        successHandler(res, data)
        throw new Error("Something went wrong!");
    },/* details of equipment by id */
    async equipmentbyid(req, res) {
        const status = req.params.status;
        const eqpid = req.params.id
        const Equipments = await equipmenttypes.findAll({
            attributes: ['id', 'type', 'details', 'isActive'],
            include: [{
                model: equipments,
                attributes: ['name', 'invoiceDate', 'manufacturerName', 'warrantyEndDate', 'about', 'serialno', 'typeId'],
                where: {
                    isActive: status ? status : 1,
                }
            }],
            where: {
                isActive: status ? status : 1, id: eqpid
            }
        });
        const data = { statusCodes: statusCodes.ok, msg: "Equipmenttypes Lists!", data: Equipments }
        successHandler(res, data)
        throw new Error("Something went wrong!");
    },
    /* school using equipment count wieses */
    async schoolequipmentcount(req, res) {
        const status = req.params.status;
        const eqpid = req.params.id
        const Equipments = await schools.findAll({
            attributes: ['id', 'udisecode', 'name'],
            group: ['id'],
            include: [{
                model: equipmetmappings,
                // attributes: ['eqpid'],
                attributes: [[Sequelize.fn("COUNT", Sequelize.col("equipmetmappings.eqpid")), "itemCount"]],
            }],
            where: {
                isActive: status ? status : 1
            }
        });
        const data = { statusCodes: statusCodes.ok, msg: "Equipmenttypes Lists!", data: Equipments, success: true }
        successHandler(res, data)
        throw new Error("Something went wrong!");

    },
    /* school using equipment details wieses */
    async schoolequipment(req, res) {
        try {
            const status = req.params.status;
            const eqpid = req.params.id
            const Equipments = await schools.findAll({
                // attributes: ['id', 'udisecode','name'],
                // group: ['id'],
                include: [{
                    model: equipmetmappings,
                    // attributes: ['eqpid'],
                    // attributes: [[Sequelize.fn("COUNT", Sequelize.col("equipmetmappings.eqpid")), "itemCount"]],
                }],
                where: {
                    isActive: status ? status : 1
                }
            });
            const data = { statusCodes: statusCodes.ok, msg: "Equipmenttypes Lists!", data: dEquipmentsata, success: true }
            successHandler(res, data)
        } catch (error) {
            const data = { statusCodes: statusCodes.Internalservererror, error: error.message, msg: "Something went wrong!", success: false }
            catcherrHandler(res, data)
        }

    },/* equipment wise school */
    async equipmentbyschoolid(req, res) {
        try {
        const schoolid = req.params.id
        const schoolbyeqp = await view_sch_eqp.findAll({
            group: ["equipmentName"],
            attributes: ['equipmentName', 'warrantyEndDate', [Sequelize.fn("COUNT", Sequelize.col("view_sch_eqp.equipmentName")), "total"]],
            where: { udisecode: schoolid }
        });
        const data = { statusCodes: statusCodes.ok, msg: "Equipmenttypes Lists!", data: schoolbyeqp, success: true }
        successHandler(res, data)
         } catch (error) {
            const data = { statusCodes: statusCodes.Internalservererror, error: error.message, msg: "Something went wrong!", success: false }
            catcherrHandler(res, data)
        }

        //throw new Error("Something went wrong!");

    },
    // add equipment type
    async addEquipmettype(req, res) {
        req.body.isActive = 1;
        req.body.isDelete = 0;
        const addNewEquipment = new equipmenttypes(req.body);
        await addNewEquipment.save()
        const data = { statusCodes: statusCodes.Created, msg: "Equipment Addedd successfully!", success: true }
        sortHandler(res, data)
        throw new Error("Something went wrong!");
    },
    // listing equipment type
    async getEquipmettype(req, res) {
        const getEquipmentType = await equipmenttypes.findAll({
            attributes: ['id','type', 'details'],
        });
        const data = { statusCodes: statusCodes.ok, msg: "Equipment Type Lists!", data: getEquipmentType, success: true }
        successHandler(res, data)
        throw new Error("Something went wrong!");
    },
    
    // single listing equipment type
    async getsingleEquipmettype(req, res) {
        const equipment = req.params.id
        const equipmenttypeExist = await equipmenttypes.findOne({
            where: {
                id: equipment,
            }
        });
        if (!equipmenttypeExist) {
            return res.status(statusCodes.Notfound).
                json({
                    msg: 'Enter id not found', success: false
                })
        }

        const getEquipmentType = await equipmenttypes.findAll({
            attributes: ['type', 'details'],
            where: { id: equipment }
        });
        const data = { statusCodes: statusCodes.ok, msg: "Equipment Type Lists!", data: getEquipmentType, success: true }
        successHandler(res, data)
        throw new Error("Something went wrong!");
    },
    // add update type
    async updateEquipmettype(req, res) {
        const eqtId = req.params.id;
        const equipmenttypeExist = await equipmenttypes.findOne({
            where: {
                id: eqtId,
            }
        });
        if (!equipmenttypeExist) {
            return res.status(statusCodes.Notfound).
                json({
                    msg: 'Enter id not found', success: false
                })
        }
        const {
            type,
            details,
        } = req.body
        await equipmenttypes.update({
            type: type,
            details: details,
        }, {
            where: {
                id: eqtId,
            }
        });
        const data = { statusCodes: statusCodes.Accepted, msg: "Equipment Type Successfully Updated!", success: true }
        sortHandler(res, data)
        throw new Error("Something went wrong!");
    },
    // add delete type
    async delteEquipmettype(req, res) {
        const eqtId = req.params.id;

        const equipmenttypeid = await equipmenttypes.findOne({
            attributes: ["id"],
            where: { id: eqtId }
        })
        if (!equipmenttypeid) {
            const data = { msg: "Enter id does not exist", statusCodes: statusCodes.Notfound, success: false }
            return sortHandler(res, data)
        }
        await equipmenttypes.destroy({ where: { id: eqtId } });
        const data = { msg: "Equipment Type deleted Successfully", statusCodes: statusCodes.ok, success: true }
        sortHandler(res, data)
        throw new Error("Something went wrong!");
    },

    /// add equipment
    async addEquipmet(req, res) {
        req.body.isActive = 1;
        req.body.isDelete = 0;
        const addNewEquipment = new equipments(req.body);
        await addNewEquipment.save()
        const data = { statusCodes: statusCodes.Created, msg: "Equipment Add successfully!", success: true }
        sortHandler(res, data)
        throw new Error("Something went wrong!");
    },
    /// list equipment
    async listEquipmet(req, res) {
        const getEquipment = await equipments.findAll({
            attributes: [
                'id',
                'name',
                'invoiceDate',
                'manufacturerName',
                'warrantyEndDate',
                'about',
                'serialno',
                'typeId',
            ],
        });
        const data = { statusCodes: statusCodes.ok, msg: "Equipment Lists!", data: getEquipment, success: true }
        successHandler(res, data)
        throw new Error("Something went wrong!");
    },
    async singlrlistEquipmet(req, res) {
        const equipmentId = req.params.id
        const getEquipment = await equipments.findAll({
            attributes: [
                'name',
                'invoiceDate',
                'manufacturerName',
                'warrantyEndDate',
                'about',
                'serialno',
                'typeId',
            ],
            where: { id: equipmentId }
        });
        const data = { statusCodes: statusCodes.ok, msg: "Equipment Lists!", data: getEquipment, success: true }
        successHandler(res, data)
        throw new Error("Something went wrong!");
    },
    /// list equipment
    async oldlistEquipmet(req, res) {
        const getEquipment = await equipments.findAll({
            attributes: [
                'name',
                'invoiceDate',
                'manufacturerName',
                'warrantyEndDate',
                'about',
                'serialno',
                'typeId',
            ],
        });
        const data = { statusCodes: statusCodes.ok, msg: "Equipment Lists!", data: getEquipment, success: true }
        successHandler(res, data)
        throw new Error("Something went wrong!");
    },

    /// update equipment
    async updateEquipment(req, res) {
        const eqtId = req.params.id;
        const {
            name,
            invoiceDate,
            manufacturerName,
            warrantyEndDate,
            about,
            serialno,
            typeId,
        } = req.body
        await equipments.update({
            name: name,
            invoiceDate: invoiceDate,
            manufacturerName: manufacturerName,
            warrantyEndDate: warrantyEndDate,
            about: about,
            serialno: serialno,
            typeId: typeId,
        }, {
            where: {
                id: eqtId,
            }
        });
        const data = { msg: "Equipment update Successfully", statusCodes: statusCodes.ok, success: true }
        sortHandler(res, data)
        throw new Error("Something went wrong!");
    },
    /// delete equipment
    async deleteEquipmet(req, res) {
        const eqtId = req.params.id;
        const equipmentid = await equipments.findOne({
            attributes: ["id"],
            where: { id: eqtId }
        })

        if (!equipmentid) {
            const data = { msg: "Enter id does not exist", statusCodes: statusCodes.Notfound, success: false }
            return sortHandler(res, data)
        }
        await equipments.destroy({ where: { id: eqtId } });
        const data = { msg: "Equipment deleted Successfully", statusCodes: statusCodes.ok, success: true }
        sortHandler(res, data)
        throw new Error("Something went wrong!");
    },

    /// school wise equipment list     
    async schooolwiseequipment(req, res) {
        // const status = req.params.status;
        const schoolid = req.params.id
        const schoolbyeqp = await view_sch_eqp.findAll({
            attributes: ['id', 'udisecode', 'manufacturerName', 'name', 'serialno', 'warrantyEndDate'],
        });
        const data = { statusCodes: statusCodes.ok, msg: "Equipmenttypes Lists!", data: schoolbyeqp, success: true }
        successHandler(res, data)
        throw new Error("Something went wrong!");
    },
    async hello(req, res, id) {
        console.log(req.params.id)
        const data = { statusCodes: statusCodes.ok, msg: "Equipmenttypes Lists!", data: data, success: true }
        successHandler(res, data)
        throw new Error("Something went wrong!");
    },/* all block lists */

    async blockList(req, res) {
        const blockList = await blocks.findAll({
            attributes: ['id', 'name'],
        });
        const data = { statusCodes: statusCodes.ok, msg: "Block Lists!", data: blockList, success: true }
        successHandler(res, data)
        throw new Error("Something went wrong!");
    },
    
    
    /* all block wise school */

    async blockSchool(req, res) {
        const blockid = req.params.blockid;
        const blockList = await blocks.findAll({
            attributes: ['id', 'name'],
            where: {
                id: blockid
            },
            include: [{
                model: schools,
                attributes: [
                    "udisecode",
                    "name",
                    "state",
                    "city",
                    "district",
                    "pincode"
                ],
            }],

        });
        const data = { statusCodes: statusCodes.ok, msg: "Block wise school Lists!", data: blockList, success: true }
        successHandler(res, data)
        throw new Error("Something went wrong!");
    },

}





// Users.findAll({
//     attributes: [
//         [Sequelize.col('tickets.supervisorid'), 'supervisorid'],
//         'id',
//         'name',
//         [Sequelize.col('roles.id'), 'roleId'],
//         [Sequelize.col('roles.name'), 'roleName']
//     ],
//     include: [
//         {
//             model: Tickets,
//             attributes: []
//         },
//         {
//             model: Roles,
//             where: {
//                 id: 2
//             }
//         }
//     ]
// });




