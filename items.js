const express = require ('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.send('All items');
});

router.get('/:items', (req, res) => {
    res.send(`One items with id ${req.params.items}`);
});

module.exports = router;