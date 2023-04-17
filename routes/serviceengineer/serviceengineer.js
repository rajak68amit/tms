/*jslint node: true */
/* jshint esversion: 8 */
/*jshint -W033 */
const auth = require('../../middleware/auth');
const validation = require('../../middleware/validation-middleware');
const upload = require('../../middleware/imageuplode.js');
const profileController = require('../../controllers/serviceengineer/profileController');
const comolainController = require('../../controllers/serviceengineer/complainController');
const blockController = require('../../controllers/serviceengineer/blockController');
const commentController = require('../../controllers/serviceengineer/commentController');
var r = require("express").Router();
module.exports = function (app) {
    r.route('/profile').get(validation.isauthenticated, auth.serviseengOnly, profileController.profile);
    r.route('/complain-request').get(validation.isauthenticated, auth.serviseengOnly, comolainController.complainRequest);
    r.route('/block-school').get(validation.isauthenticated, auth.serviseengOnly, blockController.blockschool);
    r.route('/update').put(validation.isauthenticated,validation.usrprofile, auth.serviseengOnly, profileController.update);//validation.isauthenticated,
    //imagevalida.array('upload')//,
    r.route('/manage-comment').post(upload.single('image'), validation.isauthenticated, validation.commentadd, auth.serviseengOnly, commentController.addcomment).get(validation.isauthenticated, commentController.allcomments);
  
    r.route('/manage-comment/:id').put(upload.single('image'), validation.commentadd,validation.isauthenticated, auth.serviseengOnly, commentController.updatecomment)
    .delete(validation.isauthenticated, commentController.delete).get(validation.isauthenticated, commentController.single);
    //validation.isauthenticated,
    app.use('/api/serviceengineer', r);
}