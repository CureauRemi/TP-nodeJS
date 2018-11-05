const express = require ('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.send('All list');
});

router.get('/:items', (req, res) => {
    res.send(`One list with id ${req.params.list}`);
});

module.exports = router;