import { UserData } from '../types';
import { UserController } from './userController';
import { Server } from 'http';
import { createServer } from '../createServer';
import supertest from 'supertest';
import { StatusCode } from '../enums';
import { RequiredFieldsError } from '../errors';
const api = '/api/users';

const mockUserData: UserData = {
  username: "Elon Musk",
  age: 50,
  hobbies: ["rockets"]
};

describe('CRUD /api/users', () => {

  let userController: UserController;
  let server: Server;

  beforeEach(() => {
    userController = new UserController();
    server = createServer();
  });

  afterEach((done) => {
    server.close(() => {
      done();
    });
  });

  it('getUsers should return empty array and have been called', async () => {

    await supertest(server)
      .get(api)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(StatusCode.OK)
      .then(response => {
        expect(response.body).toEqual([])
      });
  });

  it('createUser should return new user and have been called', async () => {

    await supertest(server)
      .post(api)
      .send(mockUserData)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(StatusCode.Created)
      .then(response => {
        expect(response.body).toBeTruthy()
      });
  });

  it('createUser should throw error', async () => {

    await supertest(server)
      .post(api)
      .send({username: "Joker"})
      .set('Accept', 'application/json')
      .expect('Content-Type', 'text/plain')
      .expect(StatusCode.BadRequest)
      .then(response => {
        expect(response.text).toEqual(new RequiredFieldsError().message);
      });
  });

});