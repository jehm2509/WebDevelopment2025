'use strict'

var express = require('express');
var courseController = require('../controllers/courses');
var routes = express.Router();
var token = require('../helpers/auth');

routes.post('/api/course', token.validateToken , courseController.createCourse); // Login
routes.put('/api/course/:_id', token.validateToken, courseController.editCourse); // Login
routes.delete('/api/course/:_id', token.validateToken, courseController.deleteCourse);  //Login
routes.get('/api/course/:_id', courseController.findCourseById);
routes.get('/api/courses', courseController.findAllCourses);
routes.get('/api/courses/:price', courseController.findCoursesWithPriceEqualsTo);
routes.get('/api/courses/:price/:name', courseController.findCoursesByPriceAndName);
routes.get('/api/courses/:price/or/:name', courseController.findCoursesByPriceOrName);

module.exports = routes;
