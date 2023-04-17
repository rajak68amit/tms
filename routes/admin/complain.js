/*jslint node: true */
/* jshint esversion: 8 */
/*jshint -W033 */
const auth = require('../../middleware/auth');
const validation = require('../../middleware/validation-middleware');
const complainController = require('../../controllers/admin/complainController');
const rolesController = require('../../controllers/admin/rolesController');
var r = require("express").Router();
module.exports = function (app) {
    r.route('/complains').get(validation.isauthenticated, auth.adminOnly, complainController.complain);
    r.route('/complains-blockName').get(validation.isauthenticated, auth.adminOnly, validation.blocknamevalidate, auth.adminOnly, complainController.complainfilterbyblock);
    r.route('/schoolswisecomplains/:id').get(validation.isauthenticated, complainController.schoolwisecomplain);
    r.route('/manage-role').post(validation.isauthenticated, auth.adminOnly, validation.roleName, rolesController.roleCreate).get(validation.isauthenticated, auth.adminOnly, rolesController.roleslists);
    r.route('/manage-role/:id').delete(validation.isauthenticated, auth.adminOnly, rolesController.deleterole)
        .put(validation.isauthenticated, auth.adminOnly, validation.uprolenameexist, validation.updateroleName,rolesController.updaterole).get(validation.isauthenticated, auth.adminOnly, rolesController.singleRole);
    
    //validation.roleexist,
    app.use('/api/admin', r);
}