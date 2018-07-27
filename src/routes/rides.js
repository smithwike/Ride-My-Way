import express from 'express';
import uniqid from 'uniqid';
import rideOffers from '../models/rideOffers';

const rideCreateSuccess = { message: 'Your offer has been successfully created' };
const rideRequestSuccess = { message: 'Your request has been created' };
const error = {
  error: '',
  status: 401,
};
const ridesRouter = express.Router();
const verifyParameters = (req, res, next) => {
  const parameter = req.body;
  if (parameter && parameter.destination && parameter.takeOffTime && parameter.totalSeats) {
    next();
  } else {
    error.error = 'Please input all the required parameters';
    error.status = 400;
    res.status(400).send(error);
  }
};

ridesRouter.get('/', (req, res) => {
  res.send(rideOffers);
});

ridesRouter.get('/:id', (req, res, next) => {
  const rideId = req.params.id;
  rideOffers.forEach((item) => {
    if (item.id === rideId) {
      res.send(item);
    }
  });
  error.error = 'Invalid ride';
  error.status = 404;
  next(error);
});

ridesRouter.post('/', verifyParameters, (req, res, next) => {
  const reqBody = req.body;
  const newRide = {
    id: uniqid(),
    destination: reqBody.destination,
    takeOffTime: reqBody.takeOffTime,
    totalSeats: reqBody.totalSeats,
    requests: [],
  };
  if (rideOffers.push(newRide)) {
    res.send(rideCreateSuccess);
  } else {
    error.error = 'An unknown error occured';
    error.status = 500;
    next(error);
  }
});

ridesRouter.post('/:id/requests', (req, res, next) => {
  const reqBody = req.body;
  const rideId = req.params.id;
  let isAdded = false;
  if (reqBody.name) {
    rideOffers.forEach((item) => {
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


export default ridesRouter;
