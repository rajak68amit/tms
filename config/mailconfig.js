const nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    host: process.env.MHost,
    port: process.env.MPORT,
    auth: {
        user: process.env.MUSERNAME,
        pass: process.env.MPASSWORD
    }
});
exports.transporter;