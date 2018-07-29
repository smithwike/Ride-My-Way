'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _validator = require('validator');

var _validator2 = _interopRequireDefault(_validator);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _dbQuery = require('../models/db-query');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var authRouter = _express2.default.Router();
var saltRound = 15;
var secretKey = 'my_secret_key';

var validateUser = function validateUser(req, res, next) {
  var _req$body = req.body,
      email = _req$body.email,
      password = _req$body.password,
      name = _req$body.name;

  var validName = typeof name === 'string' && name.trim() !== '' && name.trim().length >= 3;
  var validEmail = typeof email === 'string' && _validator2.default.isEmail(email);
  var validPassword = typeof password === 'string' && password.trim() !== '' && password.trim().length >= 6;

  if (validEmail && validPassword && validName) {
    next();
  } else {
    res.status(400).send({ error: 'Invalid credentials. Make sure email is valid, name and password are at least 3 and 6 characters long respectively' });
  }
};

authRouter.post('/signup', validateUser, function (req, res, next) {
  (0, _dbQuery.getUser)(req.body.email).then(function (result) {
    if (result.length > 0) {
      // console.log('user  in use');
      res.status(400).send({
        error: 'email in use'
      });
    } else {
      // console.log('user not in use');
      _bcrypt2.default.hash(req.body.password, saltRound).then(function (hash) {
        // start storage process
        (0, _dbQuery.createUser)({
          email: req.body.email,
          password: hash,
          name: req.body.name
        }).then(function (value) {
          if (value === 1) {
            res.send({
              message: 'account created'
            });
          } else {
            next({
              error: 'Internal server error',
              status: 500
            });
          }
        }).catch(function () {
          next({
            error: 'Internal server error',
            status: 500
          });
        });
      }).catch(function () {
        next({
          error: 'Internal server error',
          status: 500
        });
      });
    }
  }).catch(function () {
    // hash the user's password for storage
    res.status(500).send({
      error: 'Internal server error',
      status: 500
    });
  });
});

authRouter.post('/login', function (req, res, next) {
  // confirm email exists in database

  (0, _dbQuery.getUser)(req.body.email).then(function (result) {
    if (_bcrypt2.default.compareSync(req.body.password, result[0].user_password)) {
      var payload = {};
      payload.username = result[0].user_name;
      payload.email = result[0].user_email;
      payload.userId = result[0].user_id;
      var token = _jsonwebtoken2.default.sign(payload, secretKey);
      payload.token = token;
      res.header('Authorization', 'Bearer ' + token);
      res.send(payload);
    } else {
      next({
        message: 'Invalid email or password',
        status: 401
      });
    }
  }).catch(function () {
    next({
      message: 'Invalid email or password',
      status: 401
    });
  });
});
exports.default = authRouter;

/* getAll()
    .then((result) => {
      res.send(result);
    })
    .catch((e) => {
      console.log(e);
      next();
    });
*/
//# sourceMappingURL=auth.js.map