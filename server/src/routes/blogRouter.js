const router = require('express').Router();

router.get('/', (req, res) => res.send('Blog router'));

module.exports = router;
