'use strict'

var mongoose = require('mongoose');
var application = require('./application');

mongoose.connect('mongodb://root:root@localhost:27017/web_development?authSource=admin').then(
    () => {
        console.log("Database connection succesful. Starting application");
        application.listen(6542, function () {
            console.log("Application started");
        });
    },
    err => {
        console.log("Error when connecting to database. Application not started. " + err);
    }
);
