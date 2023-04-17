/*jslint node: true */
/* jshint esversion: 8 */
/*jshint -W033 */
const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const morgan = require('morgan');
const methodOverride = require('method-override');
//const expressBusboy = require('express-busboy');

const app = express();
var cookieParser = require('cookie-parser')
const notfound = require('./utils/methodHttpnotfound')
const errorHandling = require('./utils/errorHandling')




app.use(express.json());
app.use(cors())
app.use(cookieParser())
//expressBusboy.extend(app);
app.use(bodyParser.urlencoded({ extended: true }))

const RegistrationRoute = require('./routes/registration');
RegistrationRoute(app)

// admin routes mapping file
const UserRoute = require('./routes/admin/users');
UserRoute(app)
const Complain = require('./routes/admin/complain');
Complain(app)
const dashboard = require('./routes/admin/dashboard');
dashboard(app)
// end admin routes mapping file

//serviceengineer route mapping file
const serviceengineer = require('./routes/serviceengineer/serviceengineer');
serviceengineer(app)
//serviceengineer route mapping file

// superviser route mapping file
const superviser = require('./routes/superviser/superviser');
superviser(app)
// end superviser route mapping file

// user route mapping file
const user = require('./routes/user/user');
user(app)
// end user route mapping file

// customer route mapping file
const customer = require('./routes/customer/customer');
customer(app)


// end customer route mapping file
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger');

app.use(express.urlencoded({
    extended: false
}));
app.use(methodOverride('_method'));
app.use(morgan('dev'));
/// swagger documentation
app.use("/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument, {
        explorer: true,
        customCssUrl:
            "https://cdn.jsdelivr.net/npm/swagger-ui-themes@3.0.0/themes/3.x/theme-newspaper.css",
    })
);
// swagger
app.use(notfound);
app.use(errorHandling);
module.exports = app;
