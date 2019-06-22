const express = require('express');
const router = express.Router();
const { getNotifications } = require('../database/index');

router.all('/api/getNotifications', (req, res) => {
    getNotifications(req.body.start, req.body.end)
        .then(results => {
            res.json({ error: null, data: results })
        })
        .catch(err => res.json({ error: err, data: null }))
})

module.exports = router;