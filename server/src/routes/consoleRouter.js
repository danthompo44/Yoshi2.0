const router = require('express').Router();
const controller = require('../controllers/consoleController');

router.get('/', controller.getAll);

module.exports = router;
