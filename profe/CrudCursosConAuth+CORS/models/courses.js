'use strict'

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CourseSchema = Schema({
    name: String,
    duration: Number,
    price: Number
});

module.exports = mongoose.model('courses', CourseSchema);
