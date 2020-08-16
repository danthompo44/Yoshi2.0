const router = require('express').Router();

router.get('/', (req, res) => {
    res.send('Api working!');
});

router.use('/games', require('./gameRouter'));
router.use('/consoles', require('./consoleRouter'));
router.use('/products', require('./productRouter'));
router.use('/blogs', require('./blogRouter'));
router.use('/users', require('./userRouter'));
router.use('/queries', require('./queryRouter'));

module.exports = router;
