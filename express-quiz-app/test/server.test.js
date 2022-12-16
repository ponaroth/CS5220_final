const supertest = require('supertest');
const server = require('../server');
const base64 = require('base-64');

describe('1. GET quizzes with expectation tests', function() {
test("GET all quizzes", async () => {
	await supertest(server)
		.get("/quizzes")
		.expect(200)
		.then((response) => {
			// Check the response type and length
			expect(Array.isArray(response.body)).toBeTruthy()
			expect(response.body.length).toEqual(2)
			expect(response.body).toBeInstanceOf(Array)
			// Check the response data
			expect(response.body[0].id).toBe(1)
			expect(response.body[0]).toHaveProperty('id');
			expect(response.body[0]).toHaveProperty('name');
		})
});

test('GET one quiz by id test',async () => {
	await supertest(server)
	  .get('/quizzes/1')
	  .expect(200)
	  .expect((res) => {
		expect(typeof res.body.id).toBe('number');
		expect(typeof res.body.name).toBe('string');
		expect(typeof res.body.instructions).toBe('string');
		expect(typeof res.body.start).toBe('string');
		expect(typeof res.body.end).toBe('string');
		expect(typeof res.body.timer).toBe('object');
		expect(typeof res.body.timer.isTimed).toBe('boolean');
		expect(typeof res.body.timer.time_limit).toBe('number');
		expect(Array.isArray(res.body.question_ids)).toBe(true);
	  });
  });
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
describe('3. GET /answers with username and password', function() {
  it('responds with json', function(done) {
    supertest(server)
      .get('/answers/byCredentials')
      .set('Authorization', 'Basic ' + base64.encode('admin:password'))
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});


server.close();