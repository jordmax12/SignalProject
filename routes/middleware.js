const express = require('express');
const router = express.Router();

router.use((req, res, next) => {
    // here we can read session data to grab user, and do some validation on it.
    // for now we will hardcode valid as true
    let valid = true;
    // validation logic
    if (valid) next();
    else res.send(403, 'User is not valid');
})

module.exports = router;