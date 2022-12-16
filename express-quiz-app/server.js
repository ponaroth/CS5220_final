const cors = require('cors');
const express = require('express');
const app = express();
const port = 8888;
const quizzes = require('./api/routes/quizzes');
const answers = require('./api/routes/AnswerRouter');

app.use(cors());
app.use(express.json());

// add route
app.use('/quizzes', quizzes);
app.use('/answers', answers);

const server = app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

module.exports = server;
