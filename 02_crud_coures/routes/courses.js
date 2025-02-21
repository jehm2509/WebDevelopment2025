'use strict'

var express = require('express');

var courseController = require('../controllers/CoursesController');

var routes = express.Router();

routes.post('/api/course', courseController.createCourse);

module.exports = routes;
 