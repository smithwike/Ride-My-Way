'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUser = exports.createUser = exports.getAll = undefined;

var _pg = require('pg');

var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/ride-my-way';
var usersTable = 'users';
// const orderTable = 'orders';


var getAll = function getAll() {
  return new Promise(function (resolve, reject) {
    var client = new _pg.Client(connectionString);
    client.connect().then(function () {
      var sql = 'SELECT * FROM ' + usersTable;
      client.query(sql).then(function (result) {
        // console.log(result.rows);
        resolve(result.rows);
        client.end();
      }).catch(function (e) {
        return reject(e);
      });
    }).catch(function (e) {
      return reject(e);
    });
  });
};

var createUser = function createUser(item) {
  return new Promise(function (resolve, reject) {
    var client = new _pg.Client(connectionString);
    client.connect().then(function () {
      var sql = 'INSERT INTO ' + usersTable + ' (user_email, user_password, user_name) VALUES ($1, $2, $3)';
      var params = [item.email, item.password, item.name];
      client.query(sql, params).then(function (result) {
        // console.log(result.rows);
        resolve(result.rowCount);
        client.end();
      }).catch(function (e) {
        reject(e);
      });
    }).catch(function (e) {
      reject(e);
    });
  });
};

var getUser = function getUser(email) {
  return new Promise(function (resolve, reject) {
    var client = new _pg.Client(connectionString);
    client.connect().then(function () {
      var sql = 'SELECT * FROM ' + usersTable + ' WHERE user_email = $1;';
      var params = [email];
      client.query(sql, params).then(function (result) {
        resolve(result.rows);
        client.end();
      }).catch(function (e) {
        return reject(e);
      });
    }).catch(function (e) {
      return reject(e);
    });
  });
};

exports.getAll = getAll;
exports.createUser = createUser;
exports.getUser = getUser;
//# sourceMappingURL=db-query.js.map