import {Server} from 'http';
import { createServer } from './createServer';
import supertest from 'supertest';
import { UserData } from './types';
import { StatusCode } from './enums';
import { UserNotFoundError } from './errors';
import { mockUserData, newUser as newUserData } from './mocks';


const api = '/api/users';


describe('CRUD /api/users', () => {
  let server: Server;

  beforeEach(() => {
    server = createServer();
  });

  afterEach(() => {
    server.close();
  });
  
  it('Should return empty array successfully', async () => {
    await supertest(server)
      .get(api)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(StatusCode.OK)
      .then(response => {
        expect(response.body).toEqual([])
      })
  });

  it('Should create user with required fields successfully', async () => {

    await supertest(server)
      .post(api)
      .send(mockUserData)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(StatusCode.Created)
      .then(response => {
        expect(response.body).toBeTruthy();
      })
  });

  it('Should create user with required fields and get this user successfully', async () => {
    let id = '';

    await supertest(server)
      .post(api)
      .send(mockUserData)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(StatusCode.Created)
      .then(response => {
        expect(response.body).toBeTruthy();
        expect(response.body.id).toBeTruthy();
        id = response.body.id;
      });

    await supertest(server)
      .get(api + '/' + id)
      .expect('Content-Type', /json/)
      .expect(StatusCode.OK)
      .then(response => {
        expect(response.body.id).toEqual(id);
        expect(response.body.username).toEqual(mockUserData.username);
      });
  });

  it('Should delete user successfully', async () => {

    let id = '';

    await supertest(server)
      .post(api)
      .send(mockUserData)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(StatusCode.Created)
      .then(response => {
        expect(response.body).toBeTruthy();
        id = response.body.id;
      });

    await supertest(server)
      .delete(api + '/' + id)
      .set('Accept', 'application/json')
      .expect(StatusCode.NoContent)
      .then(response => {
        expect(response.body).toBeFalsy();
      });
  });

  it('Should create and update user successfully', async () => {

    let id = '';

    await supertest(server)
      .post(api)
      .send(mockUserData)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(StatusCode.Created)
      .then(response => {
        expect(response.body).toBeTruthy();
        id = response.body.id;
      });


    await supertest(server)
      .put(api + '/' + id)
      .send(newUserData)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(StatusCode.OK)
      .then(response => {
        expect(response.body).toBeTruthy();
        expect(response.body.id).toEqual(id);
        expect(response.body.username).toEqual(newUserData.username);
        expect(response.body.age).toEqual(newUserData.age);
        expect(response.body.hobbies).toEqual(newUserData.hobbies);
      });
  });

  it('Should create, then delete user successfully then try to get deleted user', async () => {

    let id = '';

    await supertest(server)
      .post(api)
      .send(mockUserData)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(StatusCode.Created)
      .then(response => {
        expect(response.body).toBeTruthy();
        id = response.body.id;
      });

    await supertest(server)
      .delete(api + '/' + id)
      .set('Accept', 'application/json')
      .expect(StatusCode.NoContent)
      .then(response => {
        expect(response.body).toBeFalsy();
      });

    await supertest(server)
      .get(api + '/' + id)
      .expect('Content-Type', 'text/plain')
      .expect(StatusCode.NotFound)
      .then(response => {
        expect(response.text).toBe(new UserNotFoundError().message);
      });
  });

});