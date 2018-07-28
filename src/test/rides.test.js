import expect from 'expect';
import request from 'supertest';
import app from '../app';
import rideOffers from '../models/rideOffers';

describe('POST /rides', () => {
  it('should create a new ride request', (done) => {
    request(app)
      .post('/rides')
      .send({ destination: 'Ibadan', takeOffTime: '10:30pm', totalSeats: 16 })
      .expect(200)
      .expect((res) => {
        expect(res.body.message).toInclude('successfully created');
      });
    done();
  });
});
