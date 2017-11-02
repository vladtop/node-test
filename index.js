const express = require('express');
const bodyParser = require('body-parser');

var mongoose = require('./app/db/mongoose');
var features = require('./app/web/features');

// new app
var app = express();
// set bodyParser middleware
app.use(bodyParser.json())

// define the connection port
const port = process.env.PORT || 3000;

app.use('/features', features);

// start the server
app.listen(port, () => {
    console.log(`Started at port ${port}`);
});