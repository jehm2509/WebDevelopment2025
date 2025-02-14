'use strict'

var express = require("express");
var bodyParser = require("body-parser");

var application = express();
var route = express.Router();

route.get('/api/hello-world', (request, response) => {


    response.status(200).send({
        "message": "Hello world"
    });

});

application.use(route);
application.listen(9696, () => {
    console.log("server start at port:  9696");
});
