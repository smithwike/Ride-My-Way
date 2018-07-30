import expect from 'expect';
import request from 'supertest';
import app from '../app';
import rideOffers from '../models/rideOffers';

describe('GET /rides', () => {
  it('should fetch all ride offers', () => request(app)
    .get('/api/v1/rides')
    .set('Accept', 'application/json')
    .expect(200)
    .then((response) => {
      expect(response.body.length).toBe(2);
    }));
});

describe('GET /rides/<rideId>', () => {
  it('should fetch a single ride offer with valid id', () => request(app)
    .get('/api/v1/rides/qruhn9b5h4jk4f8uiw')
    .set('Accept', 'application/json')
    .expect(200)
    .then((response) => {
      expect(response.body).toHaveProperty('destination', 'Lokoja');
    }));

  it('should return 404 with invalid ride id', () => request(app)
    .get('/api/v1/rides/qruhn9b5h4jk4f8u')
    .set('Accept', 'application/json')
    .expect(404)
    .then((response) => {
      expect(response.body.error).toContain('Invalid ride');
    }));
});
describe('POST /rides', () => {
  it('should create a new ride offer', () => request(app)
    .post('/api/v1/rides')
    .send({ destination: 'Ibadan', takeOffTime: '10:30pm', totalSeats: 16 })
    .set('Accept', 'application/json')
    .expect(200)
    .then((response) => {
      expect(response.body.message).toContain('successfully created');
      expect(rideOffers.length).toBe(3);
    }));

  it('should not create new ride offer with invalid input', () => request(app)
    .post('/api/v1/rides')
    .send({ takeOffTime: '10:30pm', totalSeats: 16 })
    .set('Accept', 'application/json')
    .expect(400)
    .then((response) => {
      expect(response.body.error).toContain('required parameters');
      expect(rideOffers.length).toBe(3);
    }));
});

describe('POST /rides/<rideId>/requests', () => {
  it('should make request to join ride', () => request(app)
    .post('/api/v1/rides/qruhn9b5h4jk4f8uiw/requests')
    .send({ name: 'William Smith' })
    .set('Accept', 'application/json')
    .expect(200)
    .then((response) => {
      expect(response.body.message).toContain('request has been created');
      expect(rideOffers[0].requests[0]).toBe('William Smith');
      expect(rideOffers[0].requests.length).toBe(1);
    }));

  it('should not make ride request with invalid data', () => request(app)
    .post('/api/v1/rides/qruhn9b5h4jk4f8uiw/requests')
    .send({})
    .set('Accept', 'application/json')
    .expect(400)
    .then((response) => {
      expect(response.body.error).toContain('append the name parameter');
      expect(rideOffers[0].requests.length).toBe(1);
    }));
  it('should not make ride request with invalid id', () => request(app)
    .post('/api/v1/rides/qruhn9b5h4jk4f8uik/requests')
    .send({ name: 'John Doe' })
    .set('Accept', 'application/json')
    .expect(404)
    .then((response) => {
      expect(response.body.error).toContain('Invalid ride');
      expect(rideOffers[0].requests.length).toBe(1);
    }));
});
