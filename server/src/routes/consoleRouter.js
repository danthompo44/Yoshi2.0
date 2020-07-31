const router = require('express').Router();
const controller = require('../controllers/consoleController');

router.get('/', controller.getAll);
router.get('/console/:id', controller.getById);

module.exports = router;
