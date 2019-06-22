const { wrapper } = require('../views/wrapper');
const express = require('express');
const router = express.Router();

router.get('*', (req, res) => {
    res.send(wrapper);
})

module.exports = router;