const supertest = require('supertest');
const server = require('../server');

test("GET /quizzes", async () => {
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
})