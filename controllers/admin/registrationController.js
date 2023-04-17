/*jslint node: true */
/* jshint esversion: 8 */
/*jshint -W033 */
require("express-async-errors");
const bcrypt = require('bcryptjs');
const emailConfig = require('../config/mailgun-js')();
const mailgun = require('mailgun-js')(emailConfig);
const { user, forgotpasswords } = require('../models');
const helpers = require('../helpers/userActivity')
const jwt = require('jsonwebtoken');
var shortid = require('shortid');
const statusCodes = require('../utils/responseCode');
const { sortHandler, catcherrHandler, successHandler } = require('../middleware/validation-middleware');
const nodemailer = require('nodemailer');
module.exports = {


    /**
     * Signin user
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
         *    - user Login 
         *   requestBody:
         *    description: user Login
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
        console.log("hekfdkd");
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
            const data = { msg: "user created successfully!", statusCodes: statusCodes.ok, success: true }
            sortHandler(res, data);
        try { } catch (error) {
            const data = { statusCodes: statusCodes.Internalservererror, error: error.message, msg: "Something went wrong!", success: false }
            catcherrHandler(res, data)
        }
    },


    /**
    * @swagger
    * /signup:
    *  post:
     *   tags:
     *    - user Login 
     *   requestBody:
     *    description: user Signup
     *    required: true
     *    content:
     *      application/json:
     *        schema:
     *          type: object
     *          properties:
    *            email:
    *              type: string
    *            role:
    *              type: number
    *            phone:
    *             type: number
    *            name:
    *               type: string
    *            password:
    *               type: string
    *            confirmed_password:
    *               type: string
    * 
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

    async signin(req, res) {
        try {
            const {
                email,
                password
            } = req.body;

            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(req.body.password, salt);
            const userExist = await user.findOne({
                where: {
                    email: email
                },
            });
            if (!userExist) {
                const data = { msg: "Wrong credentials pass", statusCodes: statusCodes.Unauthorized, success: false }
                return sortHandler(res, data);
            }
            const isPasswordMatched = await bcrypt.compare(password, userExist.password);
            if (!isPasswordMatched) {
                const data = { statusCodes: statusCodes.Unauthorized, msg: "Wrong credentials pass", success: false }
                return sortHandler(res, data);

            }
            const token = await jwt.sign({
                id: userExist.id
            }, process.env.SECRET_KEY, {
                expiresIn: process.env.JWT_EXPIRE,
            });

            // update last login time date
            var date_format_str = new Date().toLocaleString("en-US", {
                timeZone: "Asia/Kolkata", hour12: false
            }).replace(',', '');
            await user.update({ lastlogin: date_format_str }, { where: { id: userExist.id } }); // on login update last login time
            res.cookie("jwt", token, { httpOnly: true })
            const data = { statusCodes: statusCodes.PartialContent, msg: "LoggedIn Successfully", data: token, success: true }
            successHandler(res, data)

        } catch (error) {
            const data = { statusCodes: statusCodes.Internalservererror, error: error.message, msg: "Something went wrong!", success: false }
            catcherrHandler(res, data)
        }
    },

    async logout(req, res) {
        try {
            //res.cookie('jwt', '', { maxAge: 1 })
            const token = req.headers.authorization.trim().split(' ')[1]
            if(jwt.destroy(token)){  
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
            const data = { statusCodes: statusCodes.ok, msg: "user Details", data: userData, success: true }
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
                    msg: 'user Lists!',
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
            const data = { msg: "Pass code validated", statusCodes: statusCodes.ok, success: true }
            sortHandler(res, data);
        } catch (error) {
            const data = { statusCodes: statusCodes.Internalservererror, error: error.message, msg: "Something went wrong!", success: false }
            catcherrHandler(res, data)
        }
    },
    // after email pass code verified
    async forgotpassword(req, res) {
        try {
            const generatepassword = shortid.generate();
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

            const passCode = shortid.generate()
            requestData = { uid: req.passcodeid, Epass: shortid.generate(), isActive: 0 }
            const user = new forgotpasswords(requestData);
            await user.save()
            var transporter = nodemailer.createTransport({
                host: process.env.MHost,
                port: process.env.MPORT,
                auth: {
                    user: process.env.MuserNAME,
                    pass: process.env.MPASSWORD
                }
            });
            const mailData = {
                from: 'youremail@gmail.com',
                to: req.body.emailId,
                subject: "Reset Password",
                text: "Forgot Password Link",
                html: `<b>Hey there! </b> http://localhost/${passCode} <br> <br/>`,
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
            const hashPassword = await bcrypt.hash(req.body.password, salt);
            const password = { password: hashPassword }
            await user.update(password, {
                where: { id: req.user }
            });
            const data = { msg: "Password change successfully!", statusCodes: statusCodes.ok, status: true }
            sortHandler(res, data);
        } catch (error) {
            const data = { statusCodes: statusCodes.Internalservererror, error: error.message, msg: "Something went wrong!", success: false }
            catcherrHandler(res, data)
        }
    }
}