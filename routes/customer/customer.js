const auth = require('../../middleware/auth');
const validation = require('../../middleware/validation-middleware');
const profileController = require('../../controllers/customer/profileController');
const complainController = require('../../controllers/customer/complainController');
var r = require("express").Router();
module.exports = function (app) {
    r.route('/profile').get(validation.isauthenticated, auth.customerOnly, profileController.profile);
    r.route('/update').put(validation.isauthenticated, validation.isauthenticated, auth.customerOnly, profileController.update);
    r.route('/manage-complains').get(validation.isauthenticated, validation.isauthenticated, auth.customerOnly, complainController.complainlist).post(validation.isauthenticated, validation.getschoolidndsuperviserid, validation.isauthenticated, validation.requestcustomerComplain, auth.customerOnly, complainController.addComplain);
    app.use('/api/customer', r);
}