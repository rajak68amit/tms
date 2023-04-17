const validation = require('../middleware/validation-middleware');
const registrationController = require('../controllers/registrationController');
const countryController = require('../controllers/admin/countryController');
module.exports = function (app) {
    //app.route('/signup').post(validation.signup, validation.roleexist, validation.phonexist,validation.emailexist,registrationController.signup);//, ,
    //app.route('/signup').post(validation.signup,registrationController.signup);
    app.route('/rowquery').get(registrationController.rowquery);
    app.route('/signin').post(validation.signin, validation.loginudiceandemail,registrationController.signin);
    app.route('/validate-passcode').post(validation.emailpassvalidate, registrationController.ValidatePasscode);
    app.route('/forgot-password-link').post(validation.loginudiceandemail,registrationController.forgotpasswordlink);//validation.emailvalidate, 
    app.route('/testOne').get(validation.signin, registrationController.testOne);
    app.route('/logout').post(validation.isauthenticated, registrationController.logout);
    //app.route('/changepassword').post(validation.isauthenticated, validation.changepassword, registrationController.changepassword);
    app.route('/forgot-password').post(validation.emailpassvalidate, validation.forgotpassword, registrationController.forgotpassword);
    app.route('/country').get(countryController.country);
    app.route('/getstates').get(countryController.state);
}

