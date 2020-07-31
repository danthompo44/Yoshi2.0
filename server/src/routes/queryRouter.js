const router = require('express').Router();
const controller = require('../controllers/queryController');

router.get('/', controller.getAll);
router.get('/query/:id', controller.getById);
router.post('/query/create', controller.createQuery);

module.exports = router;
