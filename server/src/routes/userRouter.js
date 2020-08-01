const router = require('express').Router();
const controller = require('../controllers/userController');

router.get('/', (req, res) => res.send('Users router'));

router.post('/signup', controller.signup);

router.post('/login', controller.login);

router.post('/refresh-token', controller.refreshToken);

router.post('/logout', controller.logout);

module.exports = router;
