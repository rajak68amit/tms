
/*jslint node: true */
/* jshint esversion: 8 */
/*jshint -W033 */

const successHandler = (res, data) => {
    return res.send({
        status: data.status,
        msg: data.msg,
        data: data.data
    });
};

module.exports = {
    successHandler
}