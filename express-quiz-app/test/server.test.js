const supertest = require('supertest');
const server = require('../server');
const base64 = require('base-64');

test("1. Get quiz ", async () => {
	await supertest(server)
		.get("/quizzes")
		.expect(200)
		.then((response) => {
			// Check the response type and length
			expect(Array.isArray(response.body)).toBeTruthy()
			expect(response.body.length).toEqual(2)

			// Check the response data
			expect(response.body[0].id).toBe(1)

		})
});


///// mocha describe() and authorization with token ////
describe('2. GET /answers with bearer token', function() {
  it('responds with json', function(done) {
    supertest(server)
      .get('/answers/byToken')
      .set('Authorization', 'Bearer 12345')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});

///// mocha describe() and authorization with username and password ////
describe('2. GET /answers with username and password', function() {

  it('responds with json', function(done) {
    supertest(server)
      .get('/answers/byCredentials')
      .set('Authorization', 'Basic ' + base64.encode('admin:password'))
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});