const auth = require('../../middleware/auth');
const validation = require('../../middleware/validation-middleware');
const profileController = require('../../controllers/user/profileController');
const complainController = require('../../controllers/user/complainController');
const trainingrequestController = require('../../controllers/user/trainingrequestController');
var r = require("express").Router();
module.exports = function (app) {
    r.route('/profile').get(validation.isauthenticated, auth.userOnly, profileController.profile);
    r.route('/equipment-log').get(validation.isauthenticated, auth.userOnly, profileController.usersequipmentdetails);
    r.route('/update').put(validation.usrprofile, validation.isauthenticated, auth.userOnly, profileController.update);
    
    r.route('/manage-complain').post(validation.isauthenticated, validation.getschoolidndsuperviserid, auth.userOnly, validation.requestComplain, complainController.addComplain).get(validation.isauthenticated, auth.userOnly,complainController.Complainlist);
    r.route('/manage-complain/:id').get(validation.isauthenticated, auth.userOnly, complainController.singlecomplain).get(validation.isauthenticated, auth.userOnly, complainController.Complainlist).put(validation.isauthenticated, auth.userOnly, validation.requestComplain, complainController.update).delete(validation.isauthenticated, auth.userOnly, validation.requestComplain, complainController.delete)
    
    r.route('/complain').get(validation.isauthenticated, auth.userOnly, complainController.complain);
    r.route('/manage-training-request').post(validation.isauthenticated, validation.addtrainingrequestvalidate, auth.userOnly, trainingrequestController.addTrainingRequest).get(validation.isauthenticated, auth.userOnly, trainingrequestController.listTrainingRequest);
    r.route('/manage-training-request/:id').put(validation.isauthenticated, auth.userOnly, validation.addtrainingrequestvalidate, trainingrequestController.updateTrainingRequest).delete(validation.isauthenticated, auth.userOnly, trainingrequestController.deleteTrainingRequest).get(validation.isauthenticated, auth.userOnly, trainingrequestController.singleTrainingRequest);
    app.use('/api/user', r);
};