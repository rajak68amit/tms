/*jslint node: true */
/* jshint esversion: 8 */
/*jshint -W033 */
require("express-async-errors");
var {Sequelize,Op} = require('sequelize');
const { projects, tickets, trainings, reports, user, roles, blocks, schools, equipmetmappings, view_sch_projects } = require('../../models');
const statusCodes = require('../../utils/responseCode');
const { successHandler, sortHandler, catcherrHandler } = require('../../middleware/validation-middleware');
const attributes = require("validatorjs/src/attributes");
module.exports = {
    async schoolequipmentcount(req, res) {
        const status = req.params.status;
        const eqpid = req.params.id
        const Equipments = await projects.findAll({
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
    /* user listing  */
    /// GET API to fetch all added user Details.
    /**
     * fetch all added user Details
     * @route GET /api/admin/manage-user:
     * @api public[temp demo]
     * @param {object} req
     * @param {object} res
     * @return {error|json}
     * @author TMS TEAM
     */

    async projects(req, res) {
        try {
            let whereClause;
            let sortby = req.query.sortby || 'projects_name';
            let sort = req.query.sort || 'asc';
            if (req.query.search && req.query.search != '') {
                const search = req.body.search || req.query.search
                whereClause = whereClause = {
                    [Op.or]: [
                        { 'projects_name': { [Op.like]: `%${search}%` } },
                    ]
                };
            } 
            let ordersort = [[sortby, sort]];
            const projects_details = await view_sch_projects.findAll({
                attributes: ['amc_date', 'projects_id', 'projects_name', 'total_school','total_class'],
                where: whereClause,
                order: ordersort
            });
            const data = { statusCodes: statusCodes.ok, msg: "Projects Details Lists!", data: projects_details, success: true }
            successHandler(res, data)
        } catch (error) {
            const data = { statusCodes: statusCodes.Internalservererror, error: error.message, msg: "Something went wrong!", success: false }
            catcherrHandler(res, data)
        }
    },
    
    async Create(req, res) {
        try {
        req.body.isActive = 1;
        
        const project = new projects(req.body);
        await project.save()


       const data = { statusCodes: statusCodes.PartialContent, msg: "Projects created successfully!", success: true }
        sortHandler(res, data)
    } catch(error) {
        const data = { statusCodes: statusCodes.Internalservererror, error: error.message, msg: "Something went wrong!", success: false }
        catcherrHandler(res, data)
    }
    },
    async single(req, res) {
        try {
            const projects_details = await projects.findAll({
                attributes: ["emcdate", "details", "name", "startDate", "endDate"],
                where: { id: req.params.id }
            });
            const data = { statusCodes: statusCodes.ok, msg: "Projects Details Lists!", data: projects_details, success: true }
            successHandler(res, data)
        } catch (error) {
            const data = { statusCodes: statusCodes.Internalservererror, error: error.message, msg: "Something went wrong!", success: false }
            catcherrHandler(res, data)
        }
    },
    async update(req, res) {
        const projectsId = req.params.id
         try {
                const {
                    emcdate,
                    name,
                    details,
                    startDate,
                    endDate
                } = req.body
            await projects.update({
                emcdate: emcdate,
                name: name,
                details: details,
                startDate: startDate,
                endDate: endDate,
                }, {
                    where: {
                        id: projectsId
                    }
                });
        const data = { statusCodes: statusCodes.PartialContent, msg: "Projects update successfully!", success: true }
        sortHandler(res, data)
    } catch(error) {
        const data = { statusCodes: statusCodes.Internalservererror, error: error.message, msg: "Something went wrong!", success: false }
        catcherrHandler(res, data)
    }
    },


async delete(req, res) {
    try{
    const projectsId = req.params.id
    const checkprojects = await schools.findOne({ attributes: ['pid'], where: { pid: projectsId } });
      if(checkprojects){
        const existproject = { msg: "project already assign in school", statusCodes: statusCodes.Badrequest, success: true }
        sortHandler(res, existproject);
        await projects.destroy({
            where: {
                id: projectsId,
            }
        });
    }
        const data = { msg: "delete Successfully", statusCodes: statusCodes.ok, success: true }
        sortHandler(res, data);
    } catch(error) {
        const data = { statusCodes: statusCodes.Internalservererror, error: error.message, msg: "Something went wrong!", success: false }
        catcherrHandler(res, data)
    }
    },

    // to be done after discussonation
    async blockwiseSchool(req, res) {
        try {

           /*  let whereClause;
            let sortby = req.query.sortby || 'projects_name';
            let sort = req.query.sort || 'asc';
            if (req.query.search && req.query.search != '') {
                const search = req.body.search || req.query.search
                whereClause = whereClause = {
                    [Op.or]: [
                        { 'projects_name': { [Op.like]: `%${search}%` } },
                    ]
                };
            }

            let ordersort = [[sortby, sort]];
            const projects_details = await view_sch_projects.findAll({
                attributes: ['amc_date', 'projects_id', 'projects_name', 'total_school', 'total_class'],
                where: whereClause,
                order: ordersort
            });
 */ 

            const projects_id = req.params.projects_id || req.query.projects_id
            const projectsdetails = await projects.findOne({
                attributes:["id"],
                 where: { id: projects_id }
            })

            if (!projectsdetails){
                const data = { statusCodes: statusCodes.Notfound, msg: "Project id not found",success: false }
                sortHandler(res, data)
            }
            const blockschool = await blocks.findAll({
                attributes: ['name', 'id'],
                include: [{model: schools,
                    group: ["name"],
                    attributes: ["udisecode","id"],
                    where: {isActive:  1 },
                    include: [ {
                        attributes: ["phone"],
                        model: user
                    }]
                }
                ],
               where: { pid: projects_id }


            });
            const data = { statusCodes: statusCodes.ok, msg: "Block wise school lists!", data: blockschool, success: true }
            successHandler(res, data)
        } catch (error) {
            const data = { statusCodes: statusCodes.Internalservererror, error: error.message, msg: "Something went wrong!", success: false }
            catcherrHandler(res, data)
        }
    },
}


/**
   * @swagger
   * /api/admin/manage-projects:
   *  post:
    *   tags:
    *    - Admin Projects Management 
    *   requestBody:
    *    description: add project 
    *    required: true
    *    content:
    *      application/json:
    *        schema:
    *          type: object
    *          properties:
   *            amcDate:
   *              type: string
   *              format: date
   *            name:
   *              type: string
   *            details:
   *              type: string
   *            startDate:
   *              type: string
   *              format: date
   *            endDate:
   *              type: string
   *              format: date
   *           
   *   responses:
   *    '200':
   *      description: successful
   *      content:
   *        application/json:
   *          schema:
   *            $ref: '#/components/schemas/SuccessResponse'
   *    '500':
   *      description: error
   *      content:
   *        application/json:
   *          schema:
   *            $ref: '#/components/schemas/ErrorResponse'
   *    '400':
   *      description: Bad request
   *    '401':
   *      description: Authorization invalid
   *    '404':
   *      description: Not found
   *    '422':
   *      description: validation error
   *      content:
   *        application/json:
   *          schema:
   *            $ref: '#/components/schemas/ValidationResponse'
   */


/**
 * @swagger
 * /api/admin/project-reports:
 *  get:
 *   tags:
 *    - Admin Projects Management 
 *   responses:
 *    '200':
 *      description: successful
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/SuccessResponse'
 *    '500':
 *      description: error
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/ErrorResponse'
 *    '400':
 *      description: Bad request
 *    '401':
 *      description: Authorization invalid
 *    '404':
 *      description: Not found
 *    '422':
 *      description: validation error
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/ValidationResponse'
 */

/**
 * @swagger
 * /api/admin/manage-projects:
 *  get:
 *   tags:
 *    - Admin Projects Management 
 *   responses:
 *    '200':
 *      description: successful
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/SuccessResponse'
 *    '500':
 *      description: error
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/ErrorResponse'
 *    '400':
 *      description: Bad request
 *    '401':
 *      description: Authorization invalid
 *    '404':
 *      description: Not found
 *    '422':
 *      description: validation error
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/ValidationResponse'
 */


/**
 * @swagger
 * /api/admin/manage-projects/{id}:
 *  get:
 *   tags:
 *    - Admin Projects Management
 *   parameters:
 *    - in: path
 *      id: path
 *      type: number
 *   responses:
 *    '200':
 *      description: single project
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/SuccessResponse'
 *    '500':
 *      description: error
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/ErrorResponse'
 *    '400':
 *      description: Bad request
 *    '401':
 *      description: Authorization invalid
 *    '404':
 *      description: Not found
 *    '422':
 *      description: validation error
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/ValidationResponse'
 */

/**
 * @swagger
 * /api/admin/manage-projects/{id}:
 *  delete:
 *   tags:
 *    - Admin Projects Management
 *   parameters:
 *    - in: path
 *      id: path
 *      type: number
 *   responses:
 *    '200':
 *      description: single project
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/SuccessResponse'
 *    '500':
 *      description: error
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/ErrorResponse'
 *    '400':
 *      description: Bad request
 *    '401':
 *      description: Authorization invalid
 *    '404':
 *      description: Not found
 *    '422':
 *      description: validation error
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/ValidationResponse'
 */




