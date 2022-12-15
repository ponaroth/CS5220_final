const cors = require('cors');
const express = require('express');
const app = express();
const port = 8888;
const quizzes = require('./api/routes/quizzes');

app.use(cors());
app.use(express.json());

// add route
app.use('/quizzes', quizzes);

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
