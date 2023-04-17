/*jslint node: true */
/* jshint esversion: 8 */
/*jshint -W033 */
const validation = require('../../middleware/validation-middleware');
const userController = require('../../controllers/admin/usersController');
const equipmentController = require('../../controllers/admin/equipmentsController');
const registrationController = require('../../controllers/registrationController');
const trainingController = require('../../controllers/admin/trainingController');
const schoolController = require('../../controllers/admin/schoolController');
const auth = require('../../middleware/auth');
var r = require("express").Router();   
module.exports = function (app) {
   r.route('/manage-user').post(validation.signup, userController.userCreate).get(validation.isauthenticated, userController.userslists);
   //  r.route('/usercreate').post(validation.isauthenticated, validation.roleexist, validation.emailexist, validation.phonexist, validation.signup, userController.userCreate);
   /// r.route('/userslist').get(validation.isauthenticated, validation.signin, userController.userslists);

   r.route('/manage-user/:id').put(validation.upemailexist, validation.upphonexist, validation.updatesignup, userController.update).get(userController.singleuser).delete(validation.associateOrNotvalidation,userController.delete);
   r.route('/supervisor-lists').get(validation.isauthenticated, auth.adminOnly,userController.supervisorLists);
   r.route('/service-engineer-lists').get(validation.isauthenticated, auth.adminOnly, userController.serviceEngineerLists);
   r.route('/associateOrNot').post(validation.isauthenticated, auth.adminOnly,validation.associateOrNotvalidation,userController.mapOrNoteUser);
   r.route('/userslistsbysearch').get(validation.isauthenticated,auth.adminOnly, userController.userslistsbysearch);
   //app.route('/userdetails').post(validation.isauthenticated, registrationController.getuserDetail);
   //validation.upphonexist, 
   r.route('/equipment').get(auth.adminOnly,equipmentController.equipments);

   r.route('/schoolequipmentcount').get(validation.isauthenticated,auth.adminOnly,equipmentController.schoolequipmentcount);
   r.route('/schoolequipment').get(validation.isauthenticated,auth.adminOnly,equipmentController.schoolequipment);
   r.route('/schooolwiseequipment').get(validation.isauthenticated,auth.adminOnly,equipmentController.schooolwiseequipment);
   r.route('/equipment-by-school-id/:id').get(validation.isauthenticated,auth.adminOnly,equipmentController.equipmentbyschoolid);
   
   r.route('/change-password').post(validation.isauthenticated,auth.adminOnly, validation.changepassword, registrationController.changepassword);
   //r.route('/forgotpassword').post(validation.forgotpassword, auth.adminOnly,registrationController.forgotpassword);
   
   r.route('/manage-school').post(validation.isauthenticated, auth.adminOnly, validation.schoolAdd,schoolController.addSchools).get(validation.isauthenticated, auth.adminOnly, schoolController.schoolList)
   r.route('/manage-school/:id').get(validation.isauthenticated, auth.adminOnly, schoolController.singleschoolList).delete(validation.isauthenticated, auth.adminOnly, schoolController.delete).put(validation.isauthenticated, auth.adminOnly, validation.updateschool, validation.upemailexist, validation.upudiseexist,schoolController.update);
   r.route('/schoolId-by-equipment/:id').get(validation.isauthenticated, auth.adminOnly,schoolController.schoolwiseEquipment);

   r.route('/emails').get(userController.email);

   /// Manage equipment type
   r.route('/manage-equipment-type').post(validation.isauthenticated, auth.adminOnly,validation.equipmenttypevalidate, equipmentController.addEquipmettype).get(validation.isauthenticated, equipmentController.getEquipmettype);
   //validation.equipmenttypevalidate, validation.equipmentTypeExist,
   r.route('/manage-equipment-type/:id').put(validation.isauthenticated, auth.adminOnly, validation.updateEquipmentType, validation.updateequipmenttypevalidate,equipmentController.updateEquipmettype).delete(validation.isauthenticated, auth.adminOnly,equipmentController.delteEquipmettype).get(validation.isauthenticated, equipmentController.getsingleEquipmettype);
   /// End manage equipment Type   
   /// Manage equipment 
   r.route('/manage-equipment').post(validation.isauthenticated,auth.adminOnly, validation.equipmentvalidate, validation.equipmentTypeExist, equipmentController.addEquipmet).get(validation.isauthenticated, equipmentController.listEquipmet);
   r.route('/manage-equipment/:id').put(validation.isauthenticated, auth.adminOnly, validation.equipmentTypeExist, validation.equipmentvalidate, equipmentController.updateEquipment).delete(validation.isauthenticated, equipmentController.deleteEquipmet).get(validation.isauthenticated,auth.adminOnly, equipmentController.singlrlistEquipmet);
   /// End Manage equipment 
   app.use('/api/admin', r);
}
