import expect from 'expect';
import request from 'supertest';
import app from '../app';
import { getUser, clearTable } from '../models/db-query';


describe('POST /signup', () => {
  before((done) => {
    clearTable()
      .then(() => {
        done();
      })
      .catch(e => done(e));
  });
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
      // ensure user is in database
      getUser('mrsmith@gmail.com')
        .then((result) => {
          expect(result[0].user_email).toBe('mrsmith@gmail.com');
        });
    }));
  it('should not create user with invalid data', () => request(app)
    .post('/api/v1/auth/signup')
    .send({
      email: 'invalidEmail.com',
      password: 'crazysmithman8',
    })
    .set('Accept', 'application/json')
    .expect(400)
    .then((response) => {
      expect(response.body.error).toContain('Invalid input');
      // ensure user is not in database
      getUser('invalidEmail.com')
        .then((result) => {
          expect(result.length).toBe(0);
        });
    }));

  it('should not create new user with email in use', () => request(app)
    .post('/api/v1/auth/signup')
    .send({
      name: 'Mr Smith',
      email: 'mrsmith@gmail.com',
      password: 'crazysmithman8',
    })
    .set('Accept', 'application/json')
    .expect(400)
    .then((response) => {
      expect(response.body.error).toContain('in use');
    }));
});

describe('POST /login', () => {
  it('should authenticate user with valid credentials', () => request(app)
    .post('/api/v1/auth/login')
    .send({
      email: 'mrsmith@gmail.com',
      password: 'crazysmithman8',
    })
    .set('Accept', 'application/json')
    .expect(200)
    .then((response) => {
      expect(response.body.userId).toBeTruthy();
    }));

  it('should not authenticate user with invalid credentials', () => request(app)
    .post('/api/v1/auth/login')
    .send({
      email: 'mrsmith@gmail.com',
      password: 'wrongPassword',
    })
    .set('Accept', 'application/json')
    .expect(401)
    .then((response) => {
      expect(response.body.userId).toBeFalsy();
    }));
});
