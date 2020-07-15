const router = require('express').Router();
const controller = require('../controllers/gameController');

router.get('/', controller.getAll);

module.exports = router;
