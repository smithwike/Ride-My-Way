'use strict';

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

var _app = require('../app');

var _app2 = _interopRequireDefault(_app);

var _rideOffers = require('../models/rideOffers');

var _rideOffers2 = _interopRequireDefault(_rideOffers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('GET /rides', function () {
  it('should fetch all ride offers', function () {
    return (0, _supertest2.default)(_app2.default).get('/api/v1/rides').set('Accept', 'application/json').expect(200).then(function (response) {
      (0, _expect2.default)(response.body.length).toBe(2);
    });
  });
});

describe('GET /rides/<rideId>', function () {
  it('should fetch a single ride offer with valid id', function () {
    return (0, _supertest2.default)(_app2.default).get('/api/v1/rides/qruhn9b5h4jk4f8uiw').set('Accept', 'application/json').expect(200).then(function (response) {
      (0, _expect2.default)(response.body).toHaveProperty('destination', 'Lokoja');
    });
  });

  it('should return 404 with invalid ride id', function () {
    return (0, _supertest2.default)(_app2.default).get('/api/v1/rides/qruhn9b5h4jk4f8u').set('Accept', 'application/json').expect(404).then(function (response) {
      (0, _expect2.default)(response.body.error).toContain('Invalid ride');
    });
  });
});
describe('POST /rides', function () {
  it('should create a new ride offer', function () {
    return (0, _supertest2.default)(_app2.default).post('/api/v1/rides').send({ destination: 'Ibadan', takeOffTime: '10:30pm', totalSeats: 16 }).set('Accept', 'application/json').expect(200).then(function (response) {
      (0, _expect2.default)(response.body.message).toContain('successfully created');
      (0, _expect2.default)(_rideOffers2.default.length).toBe(3);
    });
  });

  it('should not create new ride offer with invalid input', function () {
    return (0, _supertest2.default)(_app2.default).post('/api/v1/rides').send({ takeOffTime: '10:30pm', totalSeats: 16 }).set('Accept', 'application/json').expect(400).then(function (response) {
      (0, _expect2.default)(response.body.error).toContain('required parameters');
      (0, _expect2.default)(_rideOffers2.default.length).toBe(3);
    });
  });
});

describe('POST /rides/<rideId>/requests', function () {
  it('should make request to join ride', function () {
    return (0, _supertest2.default)(_app2.default).post('/api/v1/rides/qruhn9b5h4jk4f8uiw/requests').send({ name: 'William Smith' }).set('Accept', 'application/json').expect(200).then(function (response) {
      (0, _expect2.default)(response.body.message).toContain('request has been created');
      (0, _expect2.default)(_rideOffers2.default[0].requests[0]).toBe('William Smith');
      (0, _expect2.default)(_rideOffers2.default[0].requests.length).toBe(1);
    });
  });

  it('should not make ride request with invalid data', function () {
    return (0, _supertest2.default)(_app2.default).post('/api/v1/rides/qruhn9b5h4jk4f8uiw/requests').send({}).set('Accept', 'application/json').expect(400).then(function (response) {
      (0, _expect2.default)(response.body.error).toContain('append the name parameter');
      (0, _expect2.default)(_rideOffers2.default[0].requests.length).toBe(1);
    });
  });
  it('should not make ride request with invalid id', function () {
    return (0, _supertest2.default)(_app2.default).post('/api/v1/rides/qruhn9b5h4jk4f8uik/requests').send({ name: 'John Doe' }).set('Accept', 'application/json').expect(404).then(function (response) {
      (0, _expect2.default)(response.body.error).toContain('Invalid ride');
      (0, _expect2.default)(_rideOffers2.default[0].requests.length).toBe(1);
    });
  });
});
//# sourceMappingURL=rides.test.js.map