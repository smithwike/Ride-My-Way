import express from 'express';
// import bcrypt from 'bcrypt';
// import validator from 'validator';
// import jwt  from 'jsonwebtoken';
import getAll from '../models/db-query';

const authRouter = express.Router();
// const saltRound = 15;
// const secretKey = "my_secret_key"

authRouter.get('/', (req, res, next) => {
    getAll()
    .then((result) => {
      res.send(result);
    })
    .catch((e) => {
      console.log(e);
      next();
    });
});

export default authRouter;
