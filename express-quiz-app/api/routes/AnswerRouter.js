const router = require('express').Router();
const answers = require('../../../mock_data/answers.json');
const base64 = require('base-64');
const utf8 = require('utf8');

// GET /answers
router.get('/byToken', (req, res) => {

    console.log(req.headers.authorization);

    if (req.headers.authorization != 'Bearer 12345') {
        return res.status(401).json({ error: 'invalid token' });
    }
    res.json(answers);
});

router.get('/byCredentials', (req, res) => {

    console.log(req.headers.authorization);

    const auth = req.headers.authorization;
    let bytes = base64.decode(auth.split(' ')[1]);
    console.log(bytes);
    let text = utf8.decode(bytes);
    console.log(text);

    if (text != 'admin:password') {
        return res.status(401).json({ error: 'invalid credentials' });
    }
    res.json(answers);
});

module.exports = router;