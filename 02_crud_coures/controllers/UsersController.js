'use strict'

var User = require('../models/Users');
var auth = require('../helpers/Auth');
var bcrypt = require('bcryptjs');

function createUser(request, response) {
    var userParams = request.body;

    // generate password
    var salt = bcrypt.genSaltSync(15);

    var newUser = new User();
    newUser.name = userParams.name;
    newUser.last_name = userParams.last_name;
    newUser.email = userParams.email;
    newUser.password = bcrypt.hashSync(userParams.password, salt);


    newUser.save().then(
        (userSaved) => {
            response.status(200).send({
                message: 'User created successfully'
            });
        },
        err => {
            response.status(500).send({
                message: 'An error ocurred while creating the user'
            });
        }
    );

}

function loginUser(request, response) {
    var loginParams = request.body;

    User.findOne({ email: loginParams.email }).then(
        (userFound) => {
            if (userFound == null) {
                response.status(403).send({ message: 'Invalid login data' });
            }
            if (bcrypt.compareSync(loginParams.password, userFound.password)) {

                response.status(200).send({
                    message: 'Login Success',
                    token: auth.generateToken(userFound)
                });
            } else {

                response.status(403).send({
                    message: 'Invalid login data'
                });
            }
        },
        err => {
            response.status(500).send({ message: 'An error ocurred while validating the user', error: err });
        }
    );
}

module.exports = { createUser, loginUser }