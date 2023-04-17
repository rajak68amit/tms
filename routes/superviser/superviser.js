const auth = require('../../middleware/auth');
const validation = require('../../middleware/validation-middleware');
const profileController = require('../../controllers/superviser/profileController');
const complainController = require('../../controllers/superviser/complainController');
const schoolController = require('../../controllers/superviser/schoolController');     
const employeeController = require('../../controllers/superviser/employeeController');
const equipmentController = require('../../controllers/superviser/equipmentController');
const pmreportController = require('../../controllers/superviser/pmreportController');
var r = require("express").Router();
module.exports = function (app) {
    r.route('/profile').get(validation.isauthenticated, auth.superviserOnly, profileController.profile);
    r.route('/update').put(validation.usrprofile, validation.isauthenticated, auth.superviserOnly, profileController.update);
    r.route('/complain-request').get(validation.isauthenticated, auth.superviserOnly, complainController.complainRequest);
    r.route('/school-lists').get(validation.isauthenticated, auth.superviserOnly, schoolController.school);
    r.route('/employee-lists').get(validation.isauthenticated, auth.superviserOnly, employeeController.employee);
    r.route('/pmreports-lists').get(validation.isauthenticated, auth.superviserOnly, pmreportController.pmreports);
    r.route('/equipment-lists/:udisecode').get(validation.isauthenticated, auth.superviserOnly, equipmentController.equipmentlistbyudice);// equipment list by udise code in supervisor models
    r.route('/change-password').post(validation.isauthenticated, auth.superviserOnly, validation.changepassword, profileController.changepassword);
   
   
   
    app.use('/api/superviser', r);
}