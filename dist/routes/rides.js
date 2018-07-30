'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _uniqid = require('uniqid');

var _uniqid2 = _interopRequireDefault(_uniqid);

var _rideOffers = require('../models/rideOffers');

var _rideOffers2 = _interopRequireDefault(_rideOffers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rideCreateSuccess = { message: 'Your offer has been successfully created' };
var rideRequestSuccess = { message: 'Your request has been created' };
var ridesRouter = _express2.default.Router();

var verifyParameters = function verifyParameters(req, res, next) {
  var parameter = req.body;
  if (parameter && parameter.destination && parameter.takeOffTime && parameter.totalSeats) {
    next();
  } else {
    res.status(400).send({
      error: 'Please input all the required parameters',
      status: 400
    });
  }
};

ridesRouter.get('/', function (req, res) {
  res.send(_rideOffers2.default);
});

ridesRouter.get('/:id', function (req, res) {
  var rideId = req.params.id;
  var isFound = false;
  var foundItem = void 0;
  _rideOffers2.default.forEach(function (item) {
    if (item.id === rideId) {
      foundItem = item;
      isFound = true;
    }
  });
  if (isFound) {
    res.send(foundItem);
  } else {
    res.status(404).send({
      error: 'Invalid ride',
      status: 404
    });
  }
});

ridesRouter.post('/', verifyParameters, function (req, res) {
  var reqBody = req.body;
  var newRide = {
    id: (0, _uniqid2.default)(),
    destination: reqBody.destination,
    takeOffTime: reqBody.takeOffTime,
    totalSeats: reqBody.totalSeats,
    requests: []
  };
  if (_rideOffers2.default.push(newRide)) {
    res.send(rideCreateSuccess);
  } else {
    res.status(500).send({
      error: 'An unknown error occured',
      status: 500
    });
  }
});

ridesRouter.post('/:id/requests', function (req, res) {
  var reqBody = req.body;
  var rideId = req.params.id;
  var isAdded = false;
  if (reqBody.name) {
    _rideOffers2.default.forEach(function (item) {
      if (item.id === rideId) {
        item.requests.push(reqBody.name);
        isAdded = true;
      }
    });
    if (isAdded) {
      res.send(rideRequestSuccess);
    } else {
      res.status(404).send({
        error: 'Invalid ride',
        status: 404
      });
    }
  } else {
    res.status(400).send({
      error: 'Please append the name parameter in your request',
      status: 400
    });
  }
});

exports.default = ridesRouter;
//# sourceMappingURL=rides.js.map