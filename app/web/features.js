const config = require('app/config');
const express = require('express');

var router = express.Router();

var FeaturesModel = require('app/models/featuresModel');

router.get('/', (request, response) => {
  console.log(config.getLang());
  FeaturesModel.find().then((features) => {
    response.send({features});
  }).catch((e) => {
    response.status(400).send(e);
  });
});

router.post('/', (request, response) => {
  var feature = new FeaturesModel({
    title: request.body.title
  });

  feature.save().then((doc) => {
    response.send(doc);
  }).catch((e) => {
    response.status(400).send(e);
  });
});

module.exports = router;