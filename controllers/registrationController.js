/*jslint node: true */
/* jshint esversion: 8 */
/*jshint -W033 */
require("express-async-errors");
const bcrypt = require('bcryptjs');
const emailConfig = require('../config/mailgun-js')();
const mailgun = require('mailgun-js')(emailConfig);
const { user, forgotpasswords, schools } = require('../models');
const helpers = require('../helpers/userActivity')
const jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer');
var shortid = require('shortid');
const statusCodes = require('../utils/responseCode');
const { sortHandler, catcherrHandler, successHandler } = require('../middleware/validation-middleware');
const { body, validationResult } = require('validatorjs');
const {
    Op,
    QueryTypes,
    sequelize
} = require('sequelize')
const db = require('../models');

module.exports = {


    /**
     * Signin User
     * @route POST /signin:
     * @api public[temp demo]
     * @param {object} req
     * @param {object} res
     * @return {error|json}
     * @author TMS TEAM
     */
    /**
        * @swagger
        * /signin:
        *  post:
         *   tags:
         *    - User Login 
         *   requestBody:
         *    description: User Login
         *    required: true
         *    content:
         *      application/json:
         *        schema:
         *          type: object
         *          properties:
        *            email:
        *              type: string
        *            password:
         *              type: string
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


    async signup(req, res) {
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(req.body.password, salt);
            // const emialExist = await user.findOne({
            //     where: {
            //         email: req.body.email
            //     }
            // });
            // if (emialExist) {
            //     const data = { msg: "Email id already exists!", statusCodes: statusCodes.PreconditionFailed, success: true }
            //     sortHandler(res, data);

            // }
            req.body.password = hashPassword;
            req.body.isActive = 1;
            const user = new user(req.body);
            await user.save()
            const data = { msg: "User created successfully!", statusCodes: statusCodes.ok, success: true }
            sortHandler(res, data);
        try { } catch (error) {
            const data = { statusCodes: statusCodes.Internalservererror, error: error.message, msg: "Something went wrong!", success: false }
            catcherrHandler(res, data)
        }
    },


    async signin(req, res) {
        try {   
            
            dataemail = req.body.email;
            const password = req.body.password;
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(req.body.password, salt);

            if (req.emialndudice === '') {
                const data = { msg: "Wrong credentials pass", statusCodes: statusCodes.Unauthorized, success: false }
                return sortHandler(res, data);
            }

            if (req.emialndudice.dataValues.token != ''){
                const data = { msg: "you are already loged in", statusCodes: statusCodes.Unauthorized, success: false }
                return sortHandler(res, data);
            }

            const isPasswordMatched = await bcrypt.compare(password, req.emialndudice.dataValues.password);
            if (!isPasswordMatched) {
                const data = { statusCodes: statusCodes.Unauthorized, msg: "Wrong credentials pass", success: false }
                return sortHandler(res, data)}

            const token = await jwt.sign({
                id: req.emialndudice.dataValues.id
            }, process.env.SECRET_KEY, {
                expiresIn: process.env.JWT_EXPIRE,
            });
            await user.update({
                token: token }, {
                where: { email: req.emialndudice.dataValues.email}
            });
            // update last login time date
            var date_format_str = new Date().toLocaleString("en-US", {
                timeZone: "Asia/Kolkata", hour12: false
            }).replace(',', '');
            await user.update({ lastlogin: date_format_str }, { where: { id: req.emialndudice.dataValues.id } }); // on login update last login time
            res.cookie("jwt", token, { httpOnly: true })
            const data = { statusCodes: statusCodes.ok, msg: "LoggedIn Successfully", data: token, success: true }
            successHandler(res, data)

        } catch (error) {
            const data = { statusCodes: statusCodes.Internalservererror, error: error.message, msg: "Something went wrong!", success: false }
            catcherrHandler(res, data)
        }
    },

    async logout(req, res) {
        try {
           const logoutuser= await user.update({
                token: ''
            }, {
                where: { id: req.user }
            });
            ////if (res.cookie('jwt', '', { maxAge: 1 })){
            if (logoutuser){
            const data = { msg: "Successfully log out!", statusCodes: statusCodes.ok, success: true }
            sortHandler(res, data);}else{
                console.log("Invalid token")
                exit(1)
            }
        } catch (error) {
            const data = { statusCodes: statusCodes.Internalservererror, error: error.message, msg: "Something went wrong!", success: false }
            catcherrHandler(res, data)
        }
    },

    async getuserDetail(req, res) {
        try {
            const userData = helpers.userDetails(req.user)
            const data = { statusCodes: statusCodes.ok, msg: "User Details", data: userData, success: true }
            successHandler(res, data)
        } catch (error) {
            const data = { statusCodes: statusCodes.Internalservererror, error: error.message, msg: "Something went wrong!", success: false }
            catcherrHandler(res, data)
        }
    },
    async testOne(req, res) {
        try {
            console.log("testOne");
            const userExist = await user.findAll({});
            if (userExist) {
                data = {
                    statusCodes: statusCodes.ok,
                    msg: 'User Lists!',
                    data: userExist, success: true
                }
                return res.json(data)
            }
        } catch (error) {
            const data = { statusCodes: statusCodes.Internalservererror, error: error.message, msg: "Something went wrong!", success: false }
            catcherrHandler(res, data)
        }
    },
    async ValidatePasscode(req, res) {
        try {
            const username = await forgotpasswords.findOne({
                include: [{
                    attributes: ['name'],
                    model: user,
                }],
                where: {
                    Epass: req.body.passCode
                }
            });

            const data = { msg: "Pass code validated", statusCodes: statusCodes.ok, data: username.user.dataValues,success: true }
            successHandler(res, data);
        } catch (error) {
            const data = { statusCodes: statusCodes.Internalservererror, error: error.message, msg: "Something went wrong!", success: false }
            catcherrHandler(res, data)
        }
    },
    // after email pass code verified
    async forgotpassword(req, res) {
        try {
            const salt = await bcrypt.genSalt(10);
            const passcode = req.body.password;
            const hashPassword = await bcrypt.hash(passcode, salt);
            const password = { password: hashPassword }
            await user.update(password, {
                where: { id: req.userid }
            });
            await forgotpasswords.update({ isActive: 1 }, {
                where: {
                    Epass: req.body.passCode,
                    uid: req.userid
                }
            });
            const data = { msg: "Password Reset successfully!", statusCodes: statusCodes.ok, success: true }
            sortHandler(res, data);

        } catch (error) {
            const data = { statusCodes: statusCodes.Internalservererror, error: error.message, msg: "Something went wrong!", success: false }
            catcherrHandler(res, data)
        }
    },
    // send pass code to email
    async forgotpasswordlink(req, res) {
        try {
            console.log("========", req.emialndudice)
            let newpass = shortid.generate()

            requestData = { uid: req.emialndudice.dataValues.id, Epass: newpass, isActive: 0 }
            const passcodeexit = await forgotpasswords.findOne({ 
                attributes: ['Epass'],
                where: { uid: req.emialndudice.dataValues.id, isActive :0}});
            if (passcodeexit){
                const data = { msg: "Passcode alredy sent to your email", statusCodes: statusCodes.ok, success: true }
                sortHandler(res, data);
                return true;
            }

            const user = new forgotpasswords(requestData);
            await user.save()
            var transporter = nodemailer.createTransport({
                host: process.env.MHost,
                port: process.env.MPORT,
                auth: {
                    user: process.env.MUSERNAME,
                    pass: process.env.MPASSWORD
                }
            });
            const mailData = {
                from: 'glocalqa@gmail.com',
                to: req.emialndudice.dataValues.email,
                subject: "Reset Password",
                text: "Forgot Password Link",
                html: `<b>Hey there! </b><a href='#'>${process.env.UrlLink}/${newpass} </a><br> <br/>`,
            };

            const email = transporter.sendMail(mailData, (error, info) => {
                if (error) {
                    return console.log(error.message)
                }
            })
            const data = { msg: "Password Reset link sent To your email-Id successfully!", statusCodes: statusCodes.ok, success: true }
            sortHandler(res, data);
        } catch (error) {
            const data = { statusCodes: statusCodes.Internalservererror, error: error.message, msg: "Something went wrong!", success: false }
            catcherrHandler(res, data)
        }
    },
    // after verifying passcode
    async changepassword(req, res) {
        try {
            const userExist = await user.findOne({
                attributes: ['id', 'password'], where: { id: req.user }
            });
            const isPasswordMatched = await bcrypt.compare(req.body.currentpassword, userExist.dataValues.password);
            if (!isPasswordMatched) {
                const data = { msg: "Wrong password enterd!", statusCodes: statusCodes.Unauthorized, status: false }
                sortHandler(res, data);
            }
            const salt = await bcrypt.genSalt(10);
            const password = { password: hashPassword, token: '' }
            if (req.body.password === req.body.password_confirmation) {
                await user.update(password, {
                    where: { id: req.user }
                });
            }
            const data = { msg: "Password change successfully!", statusCodes: statusCodes.PartialContent, status: true }
            sortHandler(res, data);
        } catch (error) {
            const data = { statusCodes: statusCodes.Internalservererror, error: error.message, msg: "Something went wrong!", success: false }
            catcherrHandler(res, data)
        }
    },
    // after verifying passcode
    async rowquery(req, res) {
        try {
            const gid = 17;
            const HelloUsers = await db.sequelize.query("SELECT addresses.* FROM `users` join roles on roles.id = users.roleid join addresses on addresses.userid=users.id JOIN countrys ON countrys.id =addresses.country join states on states.id = addresses.country;", {
            type: QueryTypes.SELECT,
        })
        // const HelloUsers = await db.sequelize.query("select * from users where id ="+gid , {
        //     type: QueryTypes.SELECT,
        // })
            res.status(200).json({"All users": HelloUsers})
        } catch (error) {
            const data = { statusCodes: statusCodes.Internalservererror, error: error.message, msg: "Something went wrong!", success: false }
            catcherrHandler(res, data)
        }
    }


}