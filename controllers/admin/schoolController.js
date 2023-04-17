/*jslint node: true */
/* jshint esversion: 8 */
/*jshint -W033 */
require("express-async-errors");
var { Sequelize, Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const {schools, tickets, blocks, view_sch_complains,address,user,projects } = require('../../models');
const statusCodes = require('../../utils/responseCode');
const {sequelize} = require('../../models');
const { successHandler, sortHandler, catcherrHandler, successHandlerpaginate } = require('../../middleware/validation-middleware');
module.exports = {
    async addSchools(req, res) {
        try {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        await sequelize.transaction(async (t) => {
            req.body.password = hashPassword;
            req.body.isActive = 1;
            const userSaveData =   await user.create({
                roleid: req.body.roleid,
                name: req.body.name,
                phone: req.body.phone,
                email: req.body.email,
                password: req.body.password,
                isActive: req.body.isActive,
                isDelete: 0,
                }, { transaction:t })

        // const addressData = 
        //     const addresssave = new address(addressData);
            await address.create({
            userid: userSaveData.dataValues.id,
            addressone: req.body.addresslineone,
            addresstwo: req.body.addresslinetwo,
            state: req.body.states,
            city: req.body.city,
            country: req.body.country,
            district: req.body.distric,
            pincode: req.body.pincode,
            isActive: 1,
            isDelete: 0,
        },{ transaction:t })

            await schools.create({
            userid: userSaveData.dataValues.id,
            serviceengid: req.body.serviceengid,
            udisecode: req.body.udisecode,
            name: req.body.name,
            smartclass: req.body.smartclass,
            state: req.body.state,
            city: req.body.city,
            district: req.body.distric,
            pincode: req.body.pincode,
            blockid: req.body.blockid,
            pid: req.body.pid,
            isActive: 1,
            isDelete: 0,
            },{ transaction:t })

         });
            const data = { statusCodes: statusCodes.ok, msg: " School Added Successfully!", success: true }
            sortHandler(res, data)
        } catch (error) {
            const data = { statusCodes: statusCodes.Internalservererror, error: error.message, msg: "Something went wrong!", success: false }
            catcherrHandler(res, data)
        }
    },
    async update(req, res) {
        try {
            const susercode = req.params.id;
            const userid = await user.findOne({
                attributes: ["id"],where: { id: susercode } })
            if (!userid) {
                const data = { msg: "Enter id does not exist", statusCodes: statusCodes.Notfound, success: false }
                return sortHandler(res, data)
            }
        await sequelize.transaction(async (t) => {
            const userSaveData = await user.update({
                roleid: req.body.roleid,
                name: req.body.name,
                phone: req.body.phone,
                email: req.body.email,
            }, { where: { id: susercode }, transaction: t  })
   
            await address.update({
            addressone: req.body.addresslineone,
            addresstwo: req.body.addresslinetwo,
            state: req.body.states,
            city: req.body.city,
            country: req.body.country,
            district: req.body.distric,
            pincode: req.body.pincode,
            isActive: 1,
            isDelete: 0,
            }, {where:{ userid: susercode}, transaction:t })

            await schools.update({
            serviceengid: req.body.serviceengid,
            udisecode: req.body.udisecode,
            name: req.body.name,
            smartclass: req.body.smartclass,
            state: req.body.state,
            city: req.body.city,
            district: req.body.distric,
            pincode: req.body.pincode,
            blockid: req.body.blockid,
            pid: req.body.pid,
            }, { where: { userid: susercode }, transaction: t})
        });
            const data = { statusCodes: statusCodes.ok, msg: " School updated Successfully!", success: true }
            sortHandler(res, data)
   
        } catch (error) {
            const data = { statusCodes: statusCodes.Internalservererror, error: error.message, msg: "Something went wrong!", success: false }
            catcherrHandler(res, data)
        }
    },

    async delete(req, res) {
        const susercode = req.params.id;
        const userid = await user.findOne({
            attributes: ["id"],
            where: { id: susercode }
        })
        if (!userid) {
            const data = { msg: "Enter id does not exist", statusCodes: statusCodes.Notfound, success: false }
            return sortHandler(res, data)
        }
        await user.destroy({ where: { id: susercode } });
        await address.destroy({ where: { userid: susercode } });
        await schools.destroy({ where: { userid: susercode } });
        const data = { msg: "School deleted Successfully", statusCodes: statusCodes.ok, success: true }
        sortHandler(res, data)
        throw new Error("Something went wrong!");
    },


    async bkupaddSchools(req, res) {

            const user = new schools(req.body);
            await user.save()
            const data = { statusCodes: statusCodes.ok, msg: " School Added Successfully!", success: true }
            sortHandler(res, data)
        try { } catch (error) {
            const data = { statusCodes: statusCodes.Internalservererror, error: error.message, msg: "Something went wrong!", success: false }
            catcherrHandler(res, data)
        }
    },
    // school list in project management 
    async schoolList(req, res) {
        try { 
            let sortby = req.query.sortby || 'name';
            let sort = req.query.sort || 'asc';
            const limit = 20;
            let whereClauseproject ={}
            let whereClauseblock ={}
            let whereClausesmartclass ={}
            let ordersort = [[sortby, sort]];
           let blockdata =false
           let projectdata =false
           let smarttdata =false
            let page = parseInt(req.query.page) || 1;
            let offset = 0 + (page - 1) * limit;
            if (req.query.project && req.query.project != '') {
                const project = req.body.project || req.query.project
                whereClauseproject = {
                    [Op.or]: [{ 'name': { [Op.like]: `%${project}%` } }]

                };
                projectdata=true
            }
            if (req.query.block && req.query.block != '') {
                const block = req.body.block || req.query.block
                whereClauseblock = {
                    [Op.or]: [
                        { 'name': { [Op.like]: `%${block}%` } }]
                };
                 blockdata = true;
            }
            if (req.query.smartclass && req.query.smartclass != '') {
                const smartclass = req.body.smartclass || req.query.smartclass
                whereClausesmartclass = {
                    smartclass: {
                        [Op.ne]: smartclass
                }
            }
            smarttdata=true;
        }
            const schoollist = await schools.findAll({
                attributes: ['id', 'name', 'udisecode', 'smartclass'],
                group: ["id"],
                include: [{
                    attributes: ['city'],
                    model: address,
                },
                {
                    attributes: ['phone'],
                    model: user,
                },
                {
                    attributes: ['name'],
                    model: blocks,
                    required: blockdata,
                    where: whereClauseblock
                },
                {
                    attributes: ['name'],
                    model: projects, 
                    required: projectdata,
                    where: whereClauseproject
                }],
                where: whereClausesmartclass,
                required: smarttdata,
                offset: offset,
                limit: limit,
                order: ordersort
            });

            const schoolCount = await schools.count({
                include: [{
                    attributes: [[Sequelize.fn('COUNT', Sequelize.col('address.city')), 'cityCounts']],
                    model: address,
                },
                {
                    attributes: [[Sequelize.fn('COUNT', Sequelize.col('user.phone')), 'phoneCounts']],
                    model: user,
                },
                {
                    attributes: [[Sequelize.fn('COUNT', Sequelize.col('blocks.name')), 'nameCounts']],
                    model: blocks, 
                    required: blockdata,
                    where: whereClauseblock
                },
                {
                    attributes: [[Sequelize.fn('COUNT', Sequelize.col('projects.name')), 'nameCounts']],
                    model: projects, 
                    required: projectdata,
                   where: whereClauseproject
                }],
                where: whereClausesmartclass,
                required: smarttdata,
            })
            const pagingData = { total: schoolCount, per_page: page }
            const data = { statusCodes: statusCodes.ok, msg: "School Lists!", data: schoollist, success: true, page: pagingData }
            successHandlerpaginate(res, data)
                } catch (error) {
            const data = { statusCodes: statusCodes.Internalservererror, error: error.message, msg: "Something went wrong!", success: false }
            catcherrHandler(res, data)
        }
    },
    // school list in project management 
    async singleschoolList(req, res) {
        try { 
            const school_id = req.params.id
            const schoollist = await schools.findAll({
                attributes: ['id', 'name', 'udisecode', 'smartclass'],
                group: ["id"],
                include: [{
                    attributes: ['city'],
                    model: address,
                },
                {
                    attributes: ['phone'],
                    model: user,
                },
                {
                    attributes: ['name'],
                    model: blocks,
                },
                {
                    attributes: ['name'],
                    model: projects, 
                }],
                where:{id:school_id}
            });

            const data = { statusCodes: statusCodes.ok, msg: "School Lists!", data: schoollist, success: true}
            successHandler(res, data)
                } catch (error) {
            const data = { statusCodes: statusCodes.Internalservererror, error: error.message, msg: "Something went wrong!", success: false }
            catcherrHandler(res, data)
        }
    },
    // school's equipment 
    async schoolwiseEquipment(req, res) {
        try {
            const schoollist = await schools.findAll({
                attributes: ['id', 'name', 'udisecode'],
                // group: ["id"],
               where:{
                id:req.params.id
               }
            });
            const data = { statusCodes: statusCodes.ok, msg: "School Lists!", data: schoollist, success: true }
            successHandler(res, data)
        } catch (error) {
            const data = { statusCodes: statusCodes.Internalservererror, error: error.message, msg: "Something went wrong!", success: false }
            catcherrHandler(res, data)
        }
    },

  
}




