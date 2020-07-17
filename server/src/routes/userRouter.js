const router = require('express').Router();
const controller = require('../controllers/userController');

router.get('/', (req, res) => res.send('Users router'));

router.post('/login', controller.login);

module.exports = router;
