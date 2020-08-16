const router = require('express').Router();
const controller = require('../controllers/productController');

router.get('/search', controller.searchForProducts);

module.exports = router;
