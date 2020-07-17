const router = require('express').Router();

router.get('/', (req, res) => res.send('Query router'));

module.exports = router;
