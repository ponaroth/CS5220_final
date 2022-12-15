const supertest = require('supertest');
const server = require('../server');

test("GET /quizzes", async () => {
	// const post = await Post.create({
	// 	title: "Post 1",
	// 	content: "Lorem ipsum",
	// })

	await supertest(server)
		.get("/quizzes")
		.expect(200)
		.then((response) => {
			// Check the response type and length
			expect(Array.isArray(response.body)).toBeTruthy()
			expect(response.body.length).toEqual(2)

			// Check the response data
			// expect(response.body[0]._id).toBe(post.id)
			// expect(response.body[0].title).toBe(post.title)
			// expect(response.body[0].content).toBe(post.content)
		})
})


// describe("GET /quizzes", () => {
//   describe("get all quizes", () => {

//     test("should respond with a 200 status code", async () => {
//       const response = await supertest(server).get("/quizzes");
//       expect(response.statusCode).toBe(200);
//     })
//     // test("should specify json in the content type header", async () => {
//     //   const response = await request(app).post("/users").send({
//     //     username: "username",
//     //     password: "password"
//     //   })
//     //   expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
//     // })
//     // test("response has userId", async () => {
//     //   const response = await request(app).post("/users").send({
//     //     username: "username",
//     //     password: "password"
//     //   })
//     //   expect(response.body.userId).toBeDefined()
//     // })
//   })

// //   describe("when the username and password is missing", () => {
// //     test("should respond with a status code of 400", async () => {
// //       const bodyData = [
// //         {username: "username"},
// //         {password: "password"},
// //         {}
// //       ]
// //       for (const body of bodyData) {
// //         const response = await request(app).post("/users").send(body)
// //         expect(response.statusCode).toBe(400)
// //       }
// //     })
// //   })

// })