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
var error = {
  error: '',
  status: 401
};
var ridesRouter = _express2.default.Router();
var verifyParameters = function verifyParameters(req, res, next) {
  var parameter = req.body;
  if (parameter && parameter.destination && parameter.takeOffTime && parameter.totalSeats) {
    next();
  } else {
    error.error = 'Please input all the required parameters';
    error.status = 400;
    res.status(400).send(error);
  }
};

ridesRouter.get('/', function (req, res) {
  res.send(_rideOffers2.default);
});

ridesRouter.get('/:id', function (req, res, next) {
  var rideId = req.params.id;
  _rideOffers2.default.forEach(function (item) {
    if (item.id === rideId) {
      res.send(item);
    }
  });
  error.error = 'Invalid ride';
  error.status = 404;
  next(error);
});

ridesRouter.post('/', verifyParameters, function (req, res, next) {
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
    error.error = 'An unknown error occured';
    error.status = 500;
    next(error);
  }
});

ridesRouter.post('/:id/requests', function (req, res, next) {
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
      error.error = 'Invalid ride';
      error.status = 404;
      next(error);
    }
  } else {
    error.error = 'Please append the name parameter in your request';
    error.status = 400;
    next(error);
  }
});

exports.default = ridesRouter;
//# sourceMappingURL=rides.js.map