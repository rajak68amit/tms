/*jslint node: true */
/* jshint esversion: 8 */
/*jshint -W033 */
const errorHandling = (err, req, res, next) => {
    res.status(500).json({
        msg: err.message,
        success: false,
    });
};
module.exports = errorHandling;