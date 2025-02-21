'use strict'

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CourseSchema = Schema({
    name: String,
    hour_duration: Number,
    price: Number,
    active: Boolean
});

module.exports = mongoose.model('Courses', CourseSchema);
