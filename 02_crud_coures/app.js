'use strict'

var express = require('express');
var bodyParser = require('body-parser');
var routesCourse = require('./routes/coursesRoutes');
var routesUser = require('./routes/userRoutes');

var application = express();

application.use(bodyParser.json());
application.use(bodyParser.urlencoded({ extended: false }));
application.use(routesCourse);
application.use(routesUser);

module.exports = application