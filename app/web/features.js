const express = require('express');

var router = express.Router();

var FeatureModel = require('../models/features');

router.get('/', function (request, response) {
  FeatureModel.find().then((features) => {
    response.send({features});
  }).catch((e) => {
    response.status(400).send(e);
  });
});

router.post('/', function (request, response) {
  var feature = new FeatureModel({
    title: request.body.title
  });

  feature.save().then((doc) => {
    response.send(doc);
  }).catch((e) => {
    response.status(400).send(e);
  });
});

module.exports = router