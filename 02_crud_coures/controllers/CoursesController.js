'use strict'

const { request } = require('../app');
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

function editCourse(request, response) {

    var courseId = request.params._id;
    var courseNewValues = request.body;


    var course = new Course();
    course._id = courseId;

    course.name = courseNewValues.name;
    course.hour_duration = courseNewValues.hour_duration;
    course.price = courseNewValues.price;
    course.active = courseNewValues.active;

    Course.findByIdAndUpdate(course._id, course, { new: true }).then(
        (editedCourse) => {
            response.status(200).send({
                message: "Course was edited successfully",
                course: editedCourse
            });
        },
        (err) => {
            response.status(500).send({
                message: 'An error ocurred while editing the course',
                error: err
            });
        }
    );;
}

function deleteCourse(request, response) {
    var courseId = request.params._id;
    Course.findByIdAndDelete(courseId).then(
        (deletedCourse) => {
            response.status(200).send({
                message: "Course was deleted successfully"
            });
        },
        (err) => {
            response.status(500).send({
                message: 'An error ocurred while deleting the course',
                error: err
            });
        }
    );;
}

function findCourseById(request, response) {
    var courseId = request.params._id;
    Course.findById(courseId).then(
        (foundCourse) => {
            response.status(200).send(foundCourse);
        },
        err => {
            response.status(500).send({ message: "Error getting course" });
        }
    );

}

function findAllCourses(request, response) {

    Course.find({}).then(
        (foundCourses) => {
            response.status(200).send(foundCourses);
        },
        err => {
            response.status(500).send({ message: "Error getting courses" });
        }
    );

}


function findCoursesWithPriceEqualsTo(request, response) {

    var price = request.params.price;

    var _filter = {
        price: price
    };

    Course.find(_filter).then(
        (foundCourses) => {
            response.status(200).send(foundCourses);
        },
        err => {
            response.status(500).send({ message: "Error getting courses" });
        }
    );

}


function findCoursesByPriceAndName(request, response) {

    var price = request.params.price;
    var name = request.params.name

    var _filter = {
        price: { $gt: price },
        name: { $regex: name }
    };

    Course.find(_filter).then(
        (foundCourses) => {
            response.status(200).send(foundCourses);
        },
        err => {
            response.status(500).send({ message: "Error getting courses" });
        }
    );

}

function findCoursesByPriceOrName(request, response) {

    var price = request.params.price;
    var name = request.params.name

    var _filter = {

        $or: [
            { price: { $gt: price } },
            { name: { $regex: name } }
        ]
    };

    Course.find(_filter).then(
        (foundCourses) => {
            response.status(200).send(foundCourses);
        },
        err => {
            response.status(500).send({ message: "Error getting courses" });
        }
    );

}

module.exports = {
    createCourse, editCourse, deleteCourse, findCourseById, findAllCourses, findCoursesWithPriceEqualsTo, findCoursesByPriceAndName, findCoursesByPriceOrName
}