/*jslint node: true */
/* jshint esversion: 8 */
/*jshint -W033 */
/// https://logfetch.com/mongoose-id-exists/

const Validator = require('validatorjs');
const Models = require('../models');
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]/;

const validator = async (body, rules, customMessages, callback) => {
    const validation = new Validator(body, rules, customMessages);
    validation.passes(() => callback(null, true));
    validation.fails(() => callback(validation.errors, false));
};

// Tighten password policy
Validator.register('strict', value => passwordRegex.test(value),
    'password must contain at least one uppercase letter, one lowercase letter and one number');

/**
 * Checks if incoming value already exist for unique and non-unique fields in the database
 * e.g email: required|email|exists:user,email
 */
Validator.registerAsync('exist', function (value, attribute, req, passes) {
    if (!attribute) throw new Error('Specify Requirements i.e fieldName: exist:table,column');
    //split table and column
    let attArr = attribute.split(",");
    if (attArr.length !== 2) throw new Error(`Invalid format for validation rule on ${attribute}`);
    //assign array index 0 and 1 to table and column respectively
    const {
        0: table,
        1: column
    } = attArr;
    //define custom error message
    let msg = (column == "bookName") ? `${column} has already been taken ` : `${column} already in use`
    //check if incoming value already exists in the database
    Models[table].findOne({ attribute: [column], where: { [column]: value } }).then(result => {
        if (result) {
            passes(false, msg);
        }
        passes()
    })
})
Validator.registerAsync('check', function (value, attribute, req, passes) {
    if (!attribute) throw new Error('Specify Requirements i.e fieldName: exist:table,column');
    //split table and column
    let attArr = attribute.split(",");
    if (attArr.length !== 2) throw new Error(`Invalid format for validation rule on ${attribute}`);
    //assign array index 0 and 1 to table and column respectively
    const {
        0: table,
        1: column
    } = attArr;
    //define custom error message
    let msg = `Enter ${column} not found `
    //check if incoming value already exists in the database
    Models[table].findOne({
        attribute: [column],
        where: { [column]: value } }).then(result => {
        if (!result) {
            passes(false, msg);
        }
        passes()
    })
});


/* 
alternate validation model
mongoose.model('MODELNAME').findOne({'PROPERTY': 'VALUE'}, function(error, exist) {
  if(exist && !error){
    //do something
  } else {
    //IF YOU ARE USING EXPRESS.JS, YOU MUST USE RES.SEND() or RES.END() TO TERMINATE THE CONNECTION
    res.status(500).send({"message" : "Not Found"});
    return;
  }
}; */
module.exports = validator;