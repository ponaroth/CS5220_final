const cors = require('cors');
const express = require('express');
const app = express();
const port = 8888;
const quizzes = require('./api/routes/quizzes');

app.use(cors());

// middleware to parse POST/PUT bodies in express
app.use(express.json());

// add resource route to our express application
app.use('/quizzes', quizzes);

// start the server
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
