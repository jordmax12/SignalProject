const express = require('express');
const router = express.Router();
const { createNotification, deleteNotification, getById, getNotifications, updateNotification } = require('../database/index');

router.all('/api/getNotifications', (req, res) => {
    getNotifications(req.body.start || req.query.start, req.body.end || req.query.end)
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

router.post('/api/updateNotification', (req, res) => {
    if (!req.body.id) res.json({ error: 'Must supply id', data: null })
    else {
        updateNotification(req.body)
            .then(data => {
                res.json({ error: null, data })
            })
            .catch(err => res.json({ error: err, data: null }))
    }
})

router.post('/api/deleteNotification', (req, res) => {
    if (!req.body.id) res.json({ error: 'Must supply id', data: null })
    else {
        deleteNotification(req.body.id)
            .then(data => {
                res.json({ error: null, data })
            })
            .catch(err => res.json({ error: err, data: null }))
    }
})

router.all('/api/getNotification', (req, res) => {
    if (!req.body.id && !req.query.id) res.json({ error: 'Must supply id', data: null })
    else {
        getById(req.body.id || req.query.id)
            .then(data => {
                res.json({ error: null, data })
            })
            .catch(err => res.json({ error: err, data: null }))
    }
})

module.exports = router;