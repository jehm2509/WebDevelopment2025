'use strict'

var express = require('express');

var courseController = require('../controllers/CoursesController');

var routes = express.Router();

var auth = require('../helpers/Auth');



routes.post('/api/course', auth.validateToken, courseController.createCourse);
routes.put('/api/course/:_id', auth.validateToken, courseController.editCourse);
routes.delete('/api/course/:_id', auth.validateToken, courseController.deleteCourse);
routes.get('/api/course/:_id', courseController.findCourseById);
routes.get('/api/courses', courseController.findAllCourses);
routes.get('/api/courses_eq_price/:price', courseController.findCoursesWithPriceEqualsTo);
routes.get('/api/courses_name_and_price/:name/:price', courseController.findCoursesByPriceAndName);
routes.get('/api/courses_name_or_price/:name/:price', courseController.findCoursesByPriceOrName);

module.exports = routes;
