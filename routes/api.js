const express = require('express');
const router = express.Router();
const { getAll } = require('../database/index');

router.get('/api/get', (req, res) => {
    getAll()
        .then(results => {
            res.json({ error: null, data: results })
        })
        .catch(err => res.json({ error: err, data: null }))
})

module.exports = router;