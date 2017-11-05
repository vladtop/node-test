const express = require('express');

var router = express.Router();

var LanguagesModel = require('app/models/languagesModel');

router.get('/', function (request, response) {
  LanguagesModel.find().then((languages) => {
    response.send({languages});
  }).catch((e) => {
    response.status(400).send(e);
  });
});

router.post('/', function (request, response) {
  var language = new LanguagesModel({
    title: request.body.title,
    code: request.body.code,
  });

  language.save().then((doc) => {
    response.send(doc);
  }).catch((e) => {
    response.status(400).send({
      errorMessage: 'Unable to add new record.',
      errorCode: e.code
    });
  });
});

module.exports = router;