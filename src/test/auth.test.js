import expect from 'expect';
import request from 'supertest';
import app from '../app';


describe('POST /signup', () => {
  it('should create a new user with valid data', () => request(app)
    .post('/api/v1/auth/signup')
    .send({
      name: 'Mr Smith',
      email: 'mrsmith@gmail.com',
      password: 'crazysmithman8',
    })
    .set('Accept', 'application/json')
    .expect(200)
    .then((response) => {
      expect(response.body.message).toContain('account created');
    }));

  // it('should not create new ride offer with invalid input', () => request(app)
  //   .post('/api/v1/rides')
  //   .send({ takeOffTime: '10:30pm', totalSeats: 16 })
  //   .set('Accept', 'application/json')
  //   .expect(400)
  //   .then((response) => {
  //     expect(response.body.error).toContain('required parameters');
  //     expect(rideOffers.length).toBe(3);
  //   }));
});
