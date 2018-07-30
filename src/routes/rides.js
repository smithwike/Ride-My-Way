import express from 'express';
import uniqid from 'uniqid';
import rideOffers from '../models/rideOffers';

const rideCreateSuccess = { message: 'Your offer has been successfully created' };
const rideRequestSuccess = { message: 'Your request has been created' };
const ridesRouter = express.Router();

const verifyParameters = (req, res, next) => {
  const parameter = req.body;
  if (parameter && parameter.destination && parameter.takeOffTime && parameter.totalSeats) {
    next();
  } else {
    res.status(400).send({
      error: 'Please input all the required parameters',
      status: 400,
    });
  }
};

ridesRouter.get('/', (req, res) => {
  res.send(rideOffers);
});

ridesRouter.get('/:id', (req, res) => {
  const rideId = req.params.id;
  let isFound = false;
  let foundItem;
  rideOffers.forEach((item) => {
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
      status: 404,
    });
  }
});

ridesRouter.post('/', verifyParameters, (req, res) => {
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
    res.status(500).send({
      error: 'An unknown error occured',
      status: 500,
    });
  }
});

ridesRouter.post('/:id/requests', (req, res) => {
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
      res.status(404).send({
        error: 'Invalid ride',
        status: 404,
      });
    }
  } else {
    res.status(400).send({
      error: 'Please append the name parameter in your request',
      status: 400,
    });
  }
});


export default ridesRouter;
