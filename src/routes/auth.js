import express from 'express';
import bcrypt from 'bcrypt';
import validator from 'validator';
import jwt from 'jsonwebtoken';
import { createUser, getUser } from '../models/db-query';

const authRouter = express.Router();
const saltRound = 15;
const secretKey = 'my_secret_key';

const validateUser = (req, res, next) => {
  const { email, password, name } = req.body;
  const validName = typeof name === 'string' && name.trim() !== '' && name.trim().length >= 3;
  const validEmail = typeof email === 'string' && validator.isEmail(email);
  const validPassword = typeof password === 'string' && password.trim() !== ''
        && password.trim().length >= 6;

  if (validEmail && validPassword && validName) {
    next();
  } else {
    res.status(400).send({ error: 'Invalid credentials. Make sure email is valid, name and password are at least 3 and 6 characters long respectively' });
  }
};


authRouter.post('/signup', validateUser, (req, res, next) => {
  getUser(req.body.email)
    .then((result) => {
      if (result.length > 0) {
        // console.log('user  in use');
        res.status(400).send({
          error: 'email in use',
        });
      } else {
        // console.log('user not in use');
        bcrypt.hash(req.body.password, saltRound)
          .then((hash) => {
            // start storage process
            createUser({
              email: req.body.email,
              password: hash,
              name: req.body.name,
            })
              .then((value) => {
                if (value === 1) {
                  res.send({
                    message: 'account created',
                  });
                } else {
                  next({
                    error: 'Internal server error',
                    status: 500,
                  });
                }
              }).catch(() => {
                next({
                  error: 'Internal server error',
                  status: 500,
                });
              });
          }).catch(() => {
            next({
              error: 'Internal server error',
              status: 500,
            });
          });
      }
    })
    .catch(() => {
      // hash the user's password for storage
      res.status(500).send({
        error: 'Internal server error',
        status: 500,
      });
    });
});


authRouter.post('/login', (req, res, next) => {
  // confirm email exists in database

  getUser(req.body.email)
    .then((result) => {

      if (bcrypt.compareSync(req.body.password, result[0].user_password)) {
         console.log("bycrypt successful");
        const payload = {};
        payload.username = result[0].user_name;
        payload.email = result[0].user_email;
        payload.userId = result[0].user_id;
        const token = jwt.sign(payload, secretKey);
        payload.token = token;
        res.header('Authorization', `Bearer ${token}`);
        res.send(payload);
      } else {
        next({
          message: 'Invalid email or password',
          status: 401,
        });
      }
    })
    .catch(() => {
      next({
        message: 'Invalid email or password',
        status: 401,
      });
    });
});
export default authRouter;

/* getAll()
    .then((result) => {
      res.send(result);
    })
    .catch((e) => {
      console.log(e);
      next();
    });
*/
