const router = require('express').Router();
const datetime = require('../util/datetime');

const quizzes = require('../../../mock_data/quizzes.json');

// GET /quizzes
router.get('/', (req, res) => {
    const { query } = req;
    const name = query.name;

    let all = quizzes;
    // filter by name 
    if (name) {
        all = quizzes.filter((quiz) => {
            return quiz.name.toLowerCase().includes(name.toLowerCase());
        });
    }
    
    res.json(all);
});

// POST /quizzes
router.post('/', (req, res) => {
    const { body } = req;
    const id = quizzes.length + 1;
    res.json({ ...body, id });
});

// GET /quizzes/:id
router.get('/:id', (req, res) => {
    const { params } = req;
    const id = params.id;
    const quiz = quizzes.find((quiz) => {
        return quiz.id === parseInt(id);
    });

    if (quiz) {
        res.json(quiz);
    } else {
        res.status(404).json({ error: `Quiz by id ${id} not found.` });
    }
});

// PUT /quizzes/:id
router.put('/:id', (req, res) => {
    const { params, body } = req;
    const id = params.id;
    const quiz = quizzes.find((quiz) => {
        return quiz.id === parseInt(id);
    });

    const today = datetime.getYearMonthDay();

    if (quiz) {
        if (today > quiz.start) {
            res.status(403).json({
                error: `Cannot edit quiz with start time of ${quiz.start}`,
            });
        } else {
            res.json({ ...quiz, ...body });
        }
    } else {
        res.status(404).json({ error: `Quiz by id ${id} not found.` });
    }
});

// DELETE /quizzes/:id
router.delete('/:id', (req, res) => {
    const { params } = req;
    const id = params.id;
    const quiz = quizzes.find((quiz) => {
        return quiz.id === parseInt(id);
    });
    const today = datetime.getYearMonthDay();

    if (quiz) {
        if (today > quiz.start) {
            res.status(403).json({
                error: `Cannot delete quiz with start time of ${quiz.start}`,
            });
        } else {
            res.json({ deleted: { name: quiz.name, id: quiz.id } });
        }
    } else {
        res.status(404).json({ error: `Quiz by id ${id} not found.` });
    }
});

module.exports = router;
