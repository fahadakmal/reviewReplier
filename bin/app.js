const express = require("express");
const config = require("./../config/keys.config");
const path = require('path')
const passport = require('passport');
const dashboard_controller = require("../controllers/admin").dashboard_controller;


const app = express();

// applying middleware
// require("./../setup/middleware.setup")(app)

// set the view engine to ejs
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

// DB Connection
require("./../DB.connection")(config.DB.DB1);

// init middleware
require("../setup/middleware.setup")(app);
require("./../setup/general.setup")(app);

// init passport
require("./../setup/passport.setup")(app, passport)

// init routes
require("./../setup/router.setup")(app);

app.get('/', dashboard_controller.dashboard);



app.use('/assets/css', express.static(path.join(__dirname, '../views/dashboard/assets/css')))

app.use('/assets/js', express.static(path.join(__dirname, '../views/dashboard/assets/js')))

app.use('/assets/img', express.static(path.join(__dirname, '../views/dashboard/assets/img')))

app.use('/assets/fonts', express.static(path.join(__dirname, '../views/dashboard/assets/fonts')))







module.exports = app;