const router = require('express').Router();

router.get('/', (req, res) => {
    res.send('Api working!');
});

router.use('/games', require('./gameRouter'));

module.exports = router;
