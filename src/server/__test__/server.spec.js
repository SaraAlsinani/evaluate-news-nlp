import request from 'supertest';
import { app, server } from '../index';

describe('API Test', () => {
  afterAll((done) => {
    server.close(done); 
  });

  test('It Should give not found as add-url is post not get', async () => {
    const response = await request(app).get('/add-url');
    expect(response.statusCode).toBe(404);
  });

  test('Should Direct To index.html', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toEqual(200);
    expect(response.text).toContain('<!DOCTYPE html>');
  });

  test('It Should response with error for wrong path', async () => {
    const response = await request(app).get('/zanaty');
    expect(response.statusCode).toBe(404);
  });
});
