const express = require('express');
const bodyParser = require('body-parser');

const config = require('app/config')
const mongoose = require('app/db/mongoose');
const features = require('app/web/features');
const languages = require('app/web/languages');
const languagesModel = require('app/models/languagesModel');

global.reqlib = require('app-root-path').require;

// new app
var app = express();

// define the connection port
const port = process.env.PORT || 3000;

// set bodyParser middleware
app.use(bodyParser.json());

// handle database connection failures
app.use((request, response, next) => {
    // continue only if db connection has been established and is active
    (mongoose.connection.readyState !== 1) ? response.status(503).send({error: 'Unable to access resources.'}) : next();
});

// handle language preferences
app.use((request, response, next) => {
    let acceptLanguage = request.header('Accept-Language');
    if (acceptLanguage !== undefined) {
        languagesModel.findOne({ code: acceptLanguage }).then((langDoc) => {
            config.setLang((langDoc !== null) ? langDoc.code : config.defaultLangCode);
            // send language code on the content language header
            response.header('Content-Language', config.getLang());
            next();
        });
    } else {
        // set default language
        config.setLang(config.defaultLangCode);
        // send language code on the content language header
        response.header('Content-Language', config.getLang());
        next();
    }
});

app.use('/features', features);
app.use('/languages', languages);

// start the server
app.listen(port, () => {
    console.log(`Started at port ${port}`);
});