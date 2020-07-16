const router = require('express').Router();

router.get('/', (req, res) => res.send('Console router'));

module.exports = router;
