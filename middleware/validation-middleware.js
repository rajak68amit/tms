/*jslint node: true */
/* jshint esversion: 8 */
/*jshint -W033 */
'use strict';
require("express-async-errors");
//const {statusCode }= require('http-status-codes');
const { Op } = require("sequelize");
const statusCodes = require('../utils/responseCode');
const validator = require('../helpers/validate');
const jwt = require("jsonwebtoken");
const { user, roles, forgotpasswords, blocks, schools, equipmenttypes, tickets, engsupervisermappings, countrys, states, projects } = require('../models');
/* user creation validation */
const updatesignup = async (req, res, next) => {
    const validationRule = {
        "roleid": "required|integer|min:1|check:roles,id",
        "name": "required|string|min:2",
        "addresslineone": "required|string|min:2",
        "addresslinetwo": "required|string|min:2",
        "country": "required|integer|min:1|check:countrys,id",
        "states": "required|integer|min:1|check:states,id",
        "city": "required|string|min:2",
        "distric": "required|string|min:3",
        "pincode": "required|integer|min:6",
        "phone": "required|integer|min:10",
        "email": "required|string|email",
        // "password": "required|string|min:4",
        // //"password": "required|string|min:4|confirmed",
        // "confirmed_password": "required|string|min:4", //strict is use to follow the standard form validation rules
    };
    await validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(statusCodes.Badrequest)
                .send({
                    success: false,
                    msg: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    }).catch(err => console.log(err))
}
const signup = async (req, res, next) => {
    const validationRule = {
        "roleid": "required|integer|min:1|check:roles,id",
        "name": "required|string|min:2",
        "addresslineone": "required|string|min:2",
        "addresslinetwo": "required|string|min:2",
        "country": "required|integer|min:1|check:countrys,id",
        "states": "required|integer|min:1|check:states,id",
        "city": "required|string|min:2",
         "distric": "required|string|min:3",
         "pincode": "required|integer|min:6",
        "phone": "required|integer|min:10",
        "email": "required|string|email|exist:user,email",
        "password": "required|string|min:4|confirmed",
        // "password": "required|string|min:4",
        // //"password": "required|string|min:4|confirmed",
        // "confirmed_password": "required|string|min:4", //strict is use to follow the standard form validation rules
    };
    await validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(statusCodes.Badrequest)
                .send({
                    success: false,
                    msg: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    }).catch(err => console.log(err))
}
/* user profile update  validation */
const usrprofile = async (req, res, next) => {
    const validationRule = {
        "name": "required|string|min:2",
        "phone": "required|integer|min:10",
    };
    await validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(statusCodes.Badrequest)
                .send({
                    success: false,
                    msg: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    }).catch(err => console.log(err))
}
/* block name validation */
const blocknamevalidate = async (req, res, next) => {
    const validationRule = {
        "block_name": "required|string|min:4|max:80",
    };
    await validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(statusCodes.Badrequest)
                .send({
                    success: false,
                    msg: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    }).catch(err => console.log(err))
}
/* block name validation */
const addprojectvalidate = async (req, res, next) => {
    const validationRule = {
        "amcDate": "required|date",
        "name": "required|string|min:4|max:40|exist:projects,name",
        "details": "required|string|min:4|max:200",
        "startDate": "required|date|before:endDate",
        "endDate": "required|date",
    };
    await validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(statusCodes.Badrequest)
                .send({
                    success: false,
                    msg: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    }).catch(err => console.log(err))
}
const updateprojectvalidate = async (req, res, next) => {
    const validationRule = {
        "amcDate": "required|date",
        "name": "required|string|min:4|max:40",
        "details": "required|string|min:4|max:200",
        "startDate": "required|date|before:endDate",
        "endDate": "required|date",
    };
    await validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(statusCodes.Badrequest)
                .send({
                    success: false,
                    msg: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    }).catch(err => console.log(err))
}
/* training request validation */
const addtrainingrequestvalidate = async (req, res, next) => {
    const validationRule = {
        "subject": "required|string|min:4|max:80",
        "date": "required|date|min:4|max:80",
    };
    await validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(statusCodes.Badrequest)
                .send({
                    success: false,
                    msg: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    }).catch(err => console.log(err))
}
/* phone numabe validation */
const phonenumbervalidate = async (req, res, next) => {
    const validationRule = {
        "phone": "required|integer|min:10|exist:user,phone",
    };
    await validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(statusCodes.Badrequest)
                .send({
                    success: false,
                    msg: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    }).catch(err => console.log(err))
}
/*  id  validation */
const idvalidate = async (req, res, next) => {
    const validationRule = {
        "id": "required|integer|min:10|check:user,id",
    };
    await validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(statusCodes.Badrequest)
                .send({
                    success: false,
                    msg: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    }).catch(err => console.log(err))
}
const equipmenttypevalidate = async (req, res, next) => {
    const validationRule = {
        "type": "required|string|min:2|exist:equipmenttypes,type",
        "details": "required|string",
    };
    await validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(statusCodes.Badrequest)
                .send({
                    success: false,
                    msg: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    }).catch(err => console.log(err))
}
const updateequipmenttypevalidate = async (req, res, next) => {
    const validationRule = {
        "type": "required|string|min:2",
        "details": "required|string",
    };
    await validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(statusCodes.Badrequest)
                .send({
                    success: false,
                    msg: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    }).catch(err => console.log(err))
}
const equipmentvalidate = async (req, res, next) => {
    const validationRule = {
        "name": "required|string|min:2",
        "invoiceDate": "required|date",
        "manufacturerName": "required|string",
        "warrantyEndDate": "required|string",
        "serialno": "required|integer",
        "about": "required|string",
        "typeId": "required|integer",
    };
    await validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(statusCodes.Badrequest)
                .send({
                    success: false,
                    msg: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    }).catch(err => console.log(err))
}
/* change password validatipn */
/* school add validation */
const schoolAdd = async (req, res, next) => {
    const validationRule = {
        "roleid": "required|integer|min:1|check:roles,id",
        "name": "required|string|min:2",
        "addresslineone": "required|string|min:2",
        "addresslinetwo": "required|string|min:2",
        "country": "required|integer|min:1|check:countrys,id",
        "states": "required|integer|min:1|check:states,id",
        "city": "required|string|min:2",
        "distric": "required|string|min:3",
        "pincode": "required|integer|min:6",
        "phone": "required|integer|min:10",
        "email": "required|string|email|exist:user,email",
        "password": "required|string|min:4|confirmed",
        "udisecode": "required|string|min:4|exist:schools,udisecode",
         "smartclass": "required|integer|min:1",
         "blockid": "required|integer|min:1|check:blocks,id",
         "pid": "required|integer|min:1|check:projects,id",
         "serviceengid": "required|integer|min:1|check:user,id",
    };
    await validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(statusCodes.Badrequest)
                .send({
                    success: false,
                    msg: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    }).catch(err => console.log(err))
}
const updateschool = async (req, res, next) => {
    const validationRule = {
        "roleid": "required|integer|min:1|check:roles,id",
        "name": "required|string|min:2",
        "addresslineone": "required|string|min:2",
        "addresslinetwo": "required|string|min:2",
        "country": "required|integer|min:1|check:countrys,id",
        "states": "required|integer|min:1|check:states,id",
        "city": "required|string|min:2",
        "distric": "required|string|min:3",
        "pincode": "required|integer|min:6",
        "phone": "required|integer|min:10",
        "email": "required|string|email",
        "udisecode": "required|string|min:4",
        "smartclass": "required|integer|min:1",
         "blockid": "required|integer|min:1|check:blocks,id",
         "pid": "required|integer|min:1|check:projects,id",
         "serviceengid": "required|integer|min:1|check:user,id",
    };
    await validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(statusCodes.Badrequest)
                .send({
                    success: false,
                    msg: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    }).catch(err => console.log(err))
}
/* request Complain validation */
const requestComplain = async (req, res, next) => {
    const validationRule = {
        "details": "required|string|min:4",
        "equipmentId": "required|integer|min:1|check:equipments,id",
    };
    await validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(statusCodes.Badrequest)
                .send({
                    success: false,
                    msg: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    }).catch(err => console.log(err))
}
const requestcustomerComplain = async (req, res, next) => {
    const validationRule = {
        "scode": "required|integer|min:1|check:schools,id",
        "details": "required|string|min:4",
        "equipmentId": "required|integer|min:1|check:equipments,id",
    };
    await validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(statusCodes.Badrequest)
                .send({
                    success: false,
                    msg: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    }).catch(err => console.log(err))
}
/* change password validatipn */
const changepassword = async (req, res, next) => {
    const validationRule = {
        "currentpassword": "required|string|min:1",
        "password": "required|string|min:4|confirmed",//strict is use to follow the standard form validation rules
    };
    await validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(statusCodes.Badrequest)
                .send({
                    success: false,
                    msg: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    }).catch(err => console.log(err))
}/* forgot password */
const forgotpassword = async (req, res, next) => {
    const validationRule = {
        "passCode": "required|string|max:10|min:4|check:forgotpasswords,Epass",
        "password": "required|string|min:4|confirmed",
    }
    await validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(statusCodes.Badrequest)
                .send({
                    success: false,
                    msg: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    }).catch(err => console.log(err))
}
/* signin api */
const signin = async (req, res, next) => {
    const validationRule = {
        //"email": "required|string|min:8|max:49",
        "password": "required|string|min:5", //strict is use to follow the standard form validation rules
    };
    await validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(statusCodes.Badrequest)
                .send({
                    success: false,
                    msg: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    }).catch(err => console.log(err))
}
/* validate school id on request complain */
const getschoolidndsuperviserid = async (req, res, next) => {
    try {
     let whereclouse = {}
      const scode =   req.body.scode
      if (scode && scode != undefined){
            whereclouse = {
                id: { [Op.like]: scode }
            };
        } else {
            whereclouse = {
                userid: { [Op.like]: req.user }
            };
        }
        const exitschool = await schools.findOne({ attributes: ['serviceengid', 'id'], where: whereclouse });
        if (!exitschool) {
            return res.status(statusCodes.Notfound).
                json({
                    msg: 'School id not found', success: false
                })
        }
        const superviserid = await engsupervisermappings.findOne({ attributes: ['sid','seid'], where: { seid: exitschool.dataValues.serviceengid } });
       
        if (!superviserid) {
            return res.status(statusCodes.Notfound).
                json({
                    msg: 'Supervisor id not found', success: false
                })
        }

        req.getsuperviserid = superviserid.dataValues.sid
        req.getserviceid = superviserid.dataValues.seid
        req.sidcode = exitschool.dataValues.id
        next();

    } catch (error) {
        return res.status(statusCodes.Internalservererror).json({
            error: error.message,
            msg: 'Something went wrong!', success: false
        });
    }
}/* validate request user id */
/* validate request role */
const roleexist = async (req, res, next) => {
    const validationRule = {
        "roleid": "required|integer|min:1|check:roles,id",
    };
    await validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(statusCodes.Badrequest)
                .send({
                    success: false,
                    msg: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    }).catch(err => console.log(err))
}
const associateOrNotvalidation = async (req, res, next) => {
    const validationRule = {
        "roleid": "required|integer|min:1|check:roles,id",
        "id": "integer|check:user,id",
    };
    await validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(statusCodes.Badrequest)
                .send({
                    success: false,
                    msg: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    }).catch(err => console.log(err))
}

const uprolenameexist = async (req, res, next) => {
    const name = req.body.name;
    const roleid =  req.params.id;
    const rolenameExist = await roles.findOne({
        where: {
            id: { [Op.ne]: roleid },
            name: name
        }
    });
    if (rolenameExist){
        return res.status(statusCodes.Badrequest).
            json({
                msg: 'Enter Name alredy exist', success: false
            })
    }
    next();
}
const upprojectsnameexist = async (req, res, next) => {
    const name = req.body.name || req.params.name;
    const id = req.body.id || req.params.id;
    const projectsnameExist = await projects.findOne({
        where: {
            id: { [Op.ne]: id },
            name: name
        }
    });
    if (projectsnameExist){
        return res.status(statusCodes.Badrequest).
            json({
                msg: 'Enter projects Name alredy exist', success: false
            })
    }
    next();
}

/* validate request user id */
const userexist = async (req, res, next) => {
    try {
        const uid = req.body.userid || req.params.userid;
        const userExist = await user.findOne({
            where: {
                id: uid
            }
        });
        if (!userExist) {
            return res.status(statusCodes.Notfound).
                json({
                    msg: 'Enter User Id does not exist', success: false
                })
        } else {
            const option = {
                [Op.or]: [
                    { 'userid': { [Op.like]: uid } },
                    { 'udisecode': { [Op.like]: req.body.udisecode } }
                ]
            }
            condition = option
            const useridExist = await schools.findOne({
                where: condition
            });
            if (useridExist) {
                return res.status(statusCodes.Notfound).
                    json({ msg: 'Enter User Id or Udisecode alredy exist', success: false })
            }
        }


        next();

    } catch (error) {
        return res.status(statusCodes.Notfound).json({
            error: error.message,
            msg: 'Something went wrong!', success: false
        });
    }
}/* listing block list */
const blockxist = async (req, res, next) => {
    try {
        const bid = req.body.blockid || req.params.blockid;

        const roleExist = await blocks.findOne({
            where: {
                id: bid
            }
        });
        if (!roleExist) {
            return res.status(statusCodes.Notfound).
                json({
                    msg: 'Enter Block Id does not exist', success: false
                })
        }
        next();

    } catch (error) {
        return res.status(statusCodes.Internalservererror).json({
            error: error.message,
            msg: 'Something went wrong!', success: false
        });
    }
}/* role name  */
const roleName = async (req, res, next) => {
    const validationRule = {
        "name": "required|string|min:4|max:80|exist:roles,name",
    };
    await validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(statusCodes.Badrequest)
                .send({
                    success: false,
                    msg: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    }).catch(err => console.log(err))
}
const updateroleName = async (req, res, next) => {
    const validationRule = {
        "name": "required|string|min:4|max:20",
    };
    await validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(statusCodes.Badrequest)
                .send({
                    success: false,
                    msg: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    }).catch(err => console.log(err))
}
const commentadd = async (req, res, next) => {
    const validationRule = {
        "message": "required|string|min:4|max:20",
        "ticketid": "required|integer|min:1|check:tickets,id",
        //"file": "required|extension:jpeg,png,jpg,gif|size:1024",
    };
    await validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(statusCodes.Badrequest)
                .send({
                    success: false,
                    msg: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    }).catch(err => console.log(err))
}
const updateEquipmentType = async (req, res, next) => {
    const name = req.body.type 
    const id = req.params.id;
    const equipmenttypeExist = await equipmenttypes.findOne({
        where: {
            id: { [Op.ne]: id },
            type: name
        }
    });
    if (equipmenttypeExist) {
        return res.status(statusCodes.Badrequest).
            json({
                msg: 'Enter Name alredy exist', success: false
            })
    }
    next();
}
/* validate exiting email id */
const emailexist = async (req, res, next) => {
    try {
        const emailext = await user.findOne({
            attributes: ['email'],
            where: {
                email: req.body.email
            }
        });

        if (emailext) {
            return res.status(statusCodes.Notfound).json({
                msg: 'Enter email Id alredy exist', success: false
            })
        }
        next();

    } catch (error) {
        return res.status(statusCodes.Internalservererror).json({
            error: error.message,
            msg: 'Something went wrong!', success: false
        });
    }
}
/* equipment validate */
const equipmentTypeExist = async (req, res, next) => {
    try {
        const equipmentId = await equipmenttypes.findOne({
            attributes: ['id'],
            where: {
                id: req.body.typeId
            }
        });
        if (!equipmentId) {
            return res.status(statusCodes.Notfound).json({
                msg: 'Equipment id does not exist', success: false
            })
        }
        next();

    } catch (error) {
        return res.status(statusCodes.Internalservererror).json({
            error: error.message,
            msg: 'Something went wrong!', success: false
        });
    }
}
/* equipment typs check validate */
const emailvalidate = async (req, res, next) => {
    try {
        const emailext = await user.findOne({
            attributes: ['email', 'id'],
            where: {
                email: req.body.emailId
            }
        });
        if (!emailext) {
            return res.status(statusCodes.Notfound).json({
                msg: `Enter email Id Doesn't exist`, success: false
            })
        }
        req.passcodeid = emailext.id
        next();

    } catch (error) {
        return res.status(statusCodes.Internalservererror).json({
            error: error.message,
            msg: 'Something went wrong!', success: false
        });
    }
}/* email pass code validate on  */
const emailpassvalidate = async (req, res, next) => {
    try {
        const cpasscode = await forgotpasswords.findOne({
            attributes: ['Epass', 'uid'],
            where: {
                Epass: req.body.passCode, isActive: 0
            }
        });
        if (!cpasscode) {
            return res.status(statusCodes.Unauthorized).json({
                msg: `Enter Passcode  Doesn't exist`, success: false
            })
        }
        req.userid = cpasscode.uid
        next();
    } catch (error) {
        return res.status(statusCodes.Internalservererror).json({
            error: error.message,
            msg: 'Something went wrong!', success: false
        });
    }
}



/* email check on update skip on request id */
const upemailexist = async (req, res, next) => {
    try {
        const id = req.params.id;
        const emailext = await user.findOne({
            attributes: ['id', 'email'],
            where: {
                email: req.body.email,
                id: { [Op.ne]: id }
            }
        });
        if (emailext) {
            return res.status(statusCodes.ok).json({
                msg: 'Enter email Id alredy exist', success: false
            })
        }
        next();

    } catch (error) {
        return res.status(statusCodes.Notfound).json({
            error: error.message,
            msg: 'Something went wrong!', success: false
        });
    }
}
/* email check on update skip on request id */
const upudiseexist = async (req, res, next) => {
    try {
        const userid = req.params.id;
        const udisecode = await schools.findOne({
            attributes: ['udisecode', 'userid'],
            where: {
                udisecode: req.body.udisecode,
                userid: { [Op.ne]: userid }
            }
        });
        if (udisecode) {
            return res.status(statusCodes.ok).json({
                msg: 'Enter udisecode  alredy exist', success: false
            })
        }
        next();

    } catch (error) {
        return res.status(statusCodes.Notfound).json({
            error: error.message,
            msg: 'Something went wrong!', success: false
        });
    }
}

/* phone validate  */
const phonexist = async (req, res, next) => {
    try {
        const phoneExt = await user.findOne({
            where: {
                phone: req.body.phone
            }
        });
        if (phoneExt) {
            return res.status(statusCodes.Notfound).json({
                msg: 'Enter phone alredy exist', success: false
            })
        }
        next();

    } catch (error) {
        return res.status(statusCodes.Internalservererror).json({
            error: error.message,
            msg: 'Something went wrong!', success: false
        });
    }
}/* phone validate on update on user request */

const upphonexist = async (req, res, next) => {
    try {
        const id = req.params.id;
        const phoneExt = await user.findOne({
            attributes: ['id', 'phone'],
            where: { phone: req.body.phone, id: { [Op.ne]: id } }
        });
        if (phoneExt) {
            return res.status(statusCodes.ok).json({
                msg: 'Enter phone alredy exist', success: true
            })
        }
        next();
    } catch (error) {
        return res.status(statusCodes.Internalservererror).json({
            error: error.message,
            msg: 'Something went wrong!', success: false
        });
    }
}
/* isauthenticated validateion */
const isauthenticated = async (req, res, next) => {
    if (undefined || !req.headers.authorization) {
        //if (!req.headers.cookie) {
        return res.status(statusCodes.Unauthorized).json({
            success: false,
            msg: 'A token is required for authentication',
        })
    }
    //const bearer = req.headers.authorization
    // console.log("............", req.headers.authorization.trim().split(' ')[1])
    // // const tokenw = req.headers.authorization.trim().split('=')
    // // console.log(tokenw)
    // const authHeader = req.body.token || req.query.token || req.headers["x-access-token"];
    // if (!authHeader) {
    //     return res.status(statusCodes.Unauthorized).json({ msg: "A token is required for authentication", success : false });
    // }
    try {
        //const token = req.headers.cookie.trim().split('=')[1]
        const token = req.headers.authorization.trim().split(' ')[1]
        const newtoken = token;
        jwt.verify(newtoken, process.env.SECRET_KEY);
         const userDetails =  await user.findOne({
            where: { token: newtoken } });
            if (!userDetails) {
            return res.status(statusCodes.Unauthorized).json({ msg: "Invalid Token or logout ", success: false });
        }
        if (userDetails){
            req.user = userDetails.dataValues.id;
        }
    } catch (err) {
        return res.status(statusCodes.Unauthorized).json({ msg: "Invalid Token", success: false });
    }
    return next();
}

// login with udice and emailid
const loginudiceandemail = async (req, res, next) => {
    try {
        console.log("passcode")
         let dataemail;
         let userExist;
        dataemail = req.body.email;
        if (typeof dataemail !== 'string' && Number.isInteger(dataemail) === true){
            const udisecoderesult = await schools.findOne({
                include: [{
                    attributes: ['email'],
                    model: user,
                }],
                attributes: ["userid"],
                where: { udisecode: dataemail }
            })
            if (udisecoderesult) {
                userExist = await user.findOne({ where: { email: udisecoderesult.user.dataValues.email } });
                if (userExist){
                    req.emialndudice = userExist
                } else {
                    const data = { msg: "something went wrong", statusCodes: statusCodes.Notfound, success: false }
                    return sortHandler(res, data);
                }
            } else if (!udisecoderesult) {
                const data = { msg: "udisecode code not found", statusCodes: statusCodes.Notfound, success: false }
                return sortHandler(res, data);
            }
        } else if (typeof dataemail === 'string' && dataemail.includes("@") === true){
            userExist = await user.findOne({ where: { email: dataemail } });
            if (!userExist){
                const data = { msg: "Email not found", statusCodes: statusCodes.Notfound, success: false }
                return sortHandler(res, data);
            } else if (userExist){
                req.emialndudice = userExist
            }
        }

     } catch (err) {
        return res.status(statusCodes.Internalservererror).json({ msg: "Invalid Token", success: false });
    }
    return next();
}
// validate admin
const isAdmin = async (req, res, next) => {
    try {
        const userExist = await user.findOne({
            where: {
                id: req.user.id
            }
        });
        if (userExist.usertype != "admin") {
            return res.json({
                msg: 'You are not valied for access', success: false
            })
        }
        next()
    } catch (error) {
        return res.json({
            error: error
        });
    }
}
/* handle response with data */
const successHandler = (res, data) => {
    return res.status(data.statusCodes).send({
        success: data.success,
        msg: data.msg,
        data: data.data
    });
};
const successHandlerpaginate = (res, data) => {
    return res.status(data.statusCodes).send({
        success: data.success,
        msg: data.msg,
        data: data.data,
        pagination: data.page
    });
};
/* error handle response  */
const catcherrHandler = (res, data) => {
    return res.status(data.statusCodes).send({
        success: data.success,
        msg: data.msg,
        error: data.error

    });
};
/* handle response without data */
const sortHandler = (res, data) => {
    return res.status(data.statusCodes).send({
        success: data.success,
        msg: data.msg,
    });
};

module.exports = {
    signup, successHandler, sortHandler, catcherrHandler, equipmentvalidate, idvalidate,
    emailexist, roleName, userexist, schoolAdd, updateschool, usrprofile, equipmentTypeExist, addtrainingrequestvalidate,
    phonexist, equipmenttypevalidate, successHandlerpaginate, blocknamevalidate, phonenumbervalidate,
    blockxist, requestComplain, getschoolidndsuperviserid, upudiseexist,
    signin, uprolenameexist, addprojectvalidate, updateprojectvalidate,associateOrNotvalidation,
    roleexist, updatesignup, upprojectsnameexist, updateroleName, updateEquipmentType, updateequipmenttypevalidate,
    isauthenticated, loginudiceandemail, commentadd, requestcustomerComplain,
    changepassword, forgotpassword, upemailexist, upphonexist, emailvalidate, emailpassvalidate
}