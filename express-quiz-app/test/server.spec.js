const supertest = require('supertest');
const server = require('../server');

describe("GET /quizzes/:id error handling", () => {
	it("should return 404 for invalid quizzes", async () => {
		await supertest(server)
			.get('/quizzes/8q1jk91mwmzc')
			.expect(404);
	});
});

describe("PUT /quizzes/:id error handling", () => {
	it("should return 404 for invalid quizzes", async () => {
		await supertest(server)
			.put('/quizzes/8q1jk91mwmzc')
			.expect(404);
	});
	it("should not allow editing old quizzes", async () => {
		const quizData = {
			"id": 1,
			"name": "Intermediate Edited JS Quiz",
			"instructions": "Please select the best answer.",
			"start": "2022-09-01",
			"end": "2022-09-04",
			"timer": {
				"isTimed": true,
				"time_limit": 10
			},
			"question_ids": [1, 2]
		};


		await supertest(server)
			.put('/quizzes/'+quizData.id)
			.send(quizData)
			.expect(403);
	});
});

describe("DELETE /quizzes/:id error handling", () => {
	it("should return 404 for invalid quizzes", async () => {
		await supertest(server)
			.put('/quizzes/8q1jk91mwmzc')
			.expect(404);
	});

	it("should not allow deleting old quizzes", async () => {
		await supertest(server)
			.del('/quizzes/1')
			.expect(403);
	});
});

describe("/answers error handling", () => {
	it("/answers/byToken should return 401 error for invalid authentication", async () => {
		await supertest(server)
			.get("/answers/byToken")
			.expect(401);
	});

	it("/answers/byCredentials should return 401 error for invalid authentication", async () => {
		await supertest(server)
			.get("/answers/byCredentials")
			.expect(401);
	});
});

server.close();
