const express = require('express');
const bodyParser = require('body-parser');

var mongoose = require('./app/db/mongoose');
var features = require('./app/web/features');

// new app
var app = express();

// set bodyParser middleware
app.use(bodyParser.json());

// handle database connection failures
app.use(function (req, res, next) {
    // continue only if db connection has been established and is active
    (mongoose.connection.readyState !== 1) ? res.status(503).send({error: 'Unable to access resources.'}) : next();
})

// define the connection port
const port = process.env.PORT || 3000;

app.use('/features', features);

// start the server
app.listen(port, () => {
    console.log(`Started at port ${port}`);
});