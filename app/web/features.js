const config = require('app/config');
const express = require('express');

var router = express.Router();

var FeaturesModel = require('app/models/featuresModel');
var LanguagesModel = require('app/models/languagesModel');

router.get('/', (request, response) => {
  FeaturesModel.find().populate('languages').then((features) => {
    response.send({features});
  }).catch((e) => {
    response.status(400).send(e);
  });
});

router.post('/', (request, response) => {
  LanguagesModel.findOne({code: request.body.languageCode}).then((language) => {
    if (language === null) {
      throw new Error('Invalid language code provided.');
    }
    var feature = new FeaturesModel({
      title: request.body.title,
      language: language._id
    });

    return feature.save();

  }).then((feature) => {
    response.send(feature);
  }).catch((e) => {
    response.status(400).send({
      errorMessage: e.message || 'Unable to add new record.',
      //errorCode: e.code
    });
  });
});

module.exports = router;