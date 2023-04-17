/*jslint node: true */
/* jshint esversion: 8 */
/*jshint -W033 */
const notfound = async (req, res) => {
    res.status(404).send({
        url: req.originalUrl + ' not found'
    })
}

module.exports = notfound;
