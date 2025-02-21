'use strict'

var mongoose = require('mongoose');
var application = require('./app.js');


mongoose.connect('mongodb://root:root@localhost:27017/web_development?authSource=admin').then(
    () => {
        console.log('data base connection succesfull. Starting application');
        application.listen(4000, () => {
            console.log('Application started');
        });
    },
    err => {
        console.log("Error connection to db", err);
    }
);