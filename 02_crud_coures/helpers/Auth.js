'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var { response } = require('express');

var secret = '123';

function generateToken(user) {
    var payload = {
        sub: user._id,
        name: user.email,
        iat: moment().unix(),
        exp: moment().add('2', 'hours').unix()
    }

    return jwt.encode(payload, secret);
}

function validateToken(request, response, nextStep) {
    try {
        var userToken = request.headers.authorization;
        var cleanToken = userToken.replace('Bearer ', '');
        var payload = jwt.decode(cleanToken, secret);
        request.header.userId = payload.sub;
        nextStep();
    } catch (e) {
        console.log(e);
        response.status(403).send({
            message: 'Invalid token'
        });
    }
}

module.exports = { generateToken, validateToken }