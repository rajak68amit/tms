/*jslint node: true */
/* jshint esversion: 8 */
/*jshint -W033 */
const trainingController = require('../../controllers/admin/trainingController');
const dashboardController = require('../../controllers/admin/dashboardController');
const equipmentsController = require('../../controllers/admin/equipmentsController');
const projectController = require('../../controllers/admin/projectController');
const validation = require('../../middleware/validation-middleware');
const auth = require('../../middleware/auth');
const schoolController = require('../../controllers/admin/schoolController');
var r = require("express").Router();
module.exports = function (app) {
    r.route('/training-requests').get(validation.isauthenticated, auth.adminOnly, trainingController.trainings);
    r.route('/training-requests/:id').get(validation.isauthenticated, trainingController.trainingsrequestbyschoolid);
    r.route('/countreport').get(validation.isauthenticated, auth.adminOnly, dashboardController.countReports);
    r.route('/equipment-list').get(validation.isauthenticated, auth.adminOnly, equipmentsController.equipmentLists);
    r.route('/block-list').get(validation.isauthenticated, auth.adminOnly, equipmentsController.blockList);
    r.route('/block-school/:blockid').get(validation.isauthenticated, auth.adminOnly,equipmentsController.blockSchool);
    r.route('/service-eng-reports').get(validation.isauthenticated, auth.adminOnly,dashboardController.serviceEngReports);
    r.route('/country-details').get(dashboardController.countryDetails);
    // project management

    r.route('/project-reports').get(validation.isauthenticated,auth.adminOnly, dashboardController.projectsReports);
    r.route('/manage-projects').post(validation.isauthenticated, auth.adminOnly, validation.addprojectvalidate,  projectController.Create).get(validation.isauthenticated, auth.adminOnly, projectController.projects);
    r.route('/manage-projects/:id').get(validation.isauthenticated, auth.adminOnly, projectController.single).put(validation.isauthenticated, auth.adminOnly, validation.upprojectsnameexist, validation.updateprojectvalidate, projectController.update).delete(validation.isauthenticated, auth.adminOnly, projectController.delete);
    r.route('/block-schools').get(validation.isauthenticated,auth.adminOnly,projectController.blockwiseSchool);
    
    app.use('/api/admin', r);
}
