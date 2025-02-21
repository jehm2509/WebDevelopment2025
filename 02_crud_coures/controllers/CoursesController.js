'use strict'

var Course = require('../models/Courses');

function createCourse(request, response) {
    var courseParams = request.body;

    var newCourse = new Course();
    newCourse.name = courseParams.name;
    newCourse.hour_duration = courseParams.hour_duration;
    newCourse.price = courseParams.price;
    newCourse.active = courseParams.active;

    if (newCourse.name === null || newCourse.name.trim() === ''
        || newCourse.hour_duration === null || newCourse.hour_duration <= 0) {
        response.status(400).send('Invalid params');
    }



    newCourse.save().then(
        (savedCourse) => {
            response.status(200).send({
                message: "Course was created successfully",
                course: savedCourse
            });
        },
        err => {
            response.status(500).send({ 'message': 'An error ocurred while creating the course', error: err });
        }
    );
}

module.exports = {
    createCourse
}