const router = require('express').Router();
const controller = require('../controllers/blogController');

router.get('/', controller.getAll);

module.exports = router;
