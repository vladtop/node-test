const express = require('express');

var router = express.Router();

var FeaturesModel = require('../models/features');

router.get('/', function (request, response) {
  FeaturesModel.find().then((features) => {
    response.send({features});
  }).catch((e) => {
    response.status(400).send(e);
  });
});

router.post('/', function (request, response) {
  var feature = new FeaturesModel({
    title: request.body.title
  });

  feature.save().then((doc) => {
    response.send(doc);
  }).catch((e) => {
    response.status(400).send(e);
  });
});

module.exports = router