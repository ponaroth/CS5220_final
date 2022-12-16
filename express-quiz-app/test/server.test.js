const request = require('supertest');
const server = require('../server');
const base64 = require('base-64');

describe('1. GET quizzes with expectation tests', function () {
  test("GET all quizzes", async () => {
    await request(server)
      .get("/quizzes")
      .expect(200)
      .then((response) => {
        // Check the response type and length
        expect(Array.isArray(response.body)).toBeTruthy()
        expect(response.body.length).toEqual(3)
        expect(response.body).toBeInstanceOf(Array)
        // Check the response data
        expect(response.body[0].id).toBe(1)
        expect(response.body[0]).toHaveProperty('id');
        expect(response.body[0]).toHaveProperty('name');
      })
  });

  test('GET one quiz by id test', async () => {
    await request(server)
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

  test('Add quiz test', async () => {
    let newQuiz = {
      "name": "Quiz 3",
      "instructions": "test text.",
      "timer": {
          "isTimed": true,
          "time_limit": 10
      },
      "question_ids": []
  }

    await request(server)
      .post('/quizzes')
      .send(newQuiz)
      .expect(200)
      .expect((res) => {
        res.body = newQuiz;
      });
  });
});

//// Add and Update Request ////
describe("2. Add and Update Quiz test", function () {
  test('Add quiz should succeed', async () => {
    let newQuiz = {
      "name": "Quiz 4",
      "instructions": "test text.",
      "timer": {
          "isTimed": true,
          "time_limit": 10
      },
      "question_ids": []
  }
    await request(server)
      .post('/quizzes')
      .send(newQuiz)
      .expect(200)
      .expect((res) => {
        res.body = newQuiz;
      });
  });

  test('Update quiz should succeed', async () => {
    let update = {
      "question_ids": [5, 6]
  }
    await request(server)
      .put('/quizzes/3')
      .send(update)
      .expect(200)
      .expect((res) => {
        res.body.question_ids = update.question_ids;
      });
  });
});

//// Delete and Error test ////
describe("3. Delete and Error test", function () {
  it('Delete quiz should succeed', function (done) {
    request(server)
      .delete('/quizzes/3')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });

  it('Delete quiz 4 should throw 404 error', function (done) {
    request(server)
      .delete('/quizzes/4')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404, done);
  });
});

//// Authorization ////
describe("4. Authorization test", function () {
  it('GET /answers with bearer token', function (done) {
    request(server)
      .get('/answers/byToken')
      .set('Authorization', 'Bearer 12345')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });

  it('GET /answers with username and password', function (done) {
    request(server)
      .get('/answers/byCredentials')
      .set('Authorization', 'Basic ' + base64.encode('admin:password'))
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});


server.close();