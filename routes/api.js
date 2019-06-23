const express = require('express');
const router = express.Router();
const { getNotifications, createNotification } = require('../database/index');

router.all('/api/getNotifications', (req, res) => {
    getNotifications(req.body.start, req.body.end)
        .then(results => {
            res.json({ error: null, data: results })
        })
        .catch(err => res.json({ error: err, data: null }))
})

router.post('/api/createNotification', (req, res) => {
    if (!req.body.name) res.json({ error: 'Must supply name', data: null })
    else if (!req.body.message) res.json({ error: 'Must supply message', data: null })
    else {
        createNotification(req.body)
            .then(data => {
                res.json({ error: null, data })
            })
            .catch(err => res.json({ error: err, data: null }))
    }
})

module.exports = router;