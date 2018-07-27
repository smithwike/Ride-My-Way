import express from 'express';
import uniqid from 'uniqid';
import rideOffers from '../models/rideOffers';

const rideCreateSuccess = { message: 'Your offer has been successfully created' };
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

ridesRouter.post('/', verifyParameters, (req, res) => {
  const reqBody = req.body;
  const newRide = {
    id: uniqid(),
    destination: reqBody.destination,
    takeOffTime: reqBody.takeOffTime,
    totalSeats: reqBody.totalSeats,
  };
  if (rideOffers.push(newRide)) {
    res.send(rideCreateSuccess);
  } else {
    error.error = 'An unknown error occured';
    error.status = 500;
    res.status(500).send(error);
  }
});


export default ridesRouter;
