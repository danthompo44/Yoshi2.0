const router = require('express').Router();
const controller = require('../controllers/consoleController');

router.get('/', controller.getAll);
router.get('/console/:id', controller.getById);
router.get('/console/:id/post', controller.getPostByConsoleId);

router.get('/posts', controller.getAllPosts);
router.get('/posts/:id', controller.getPostById);

router.get('/posts/:id/comments', controller.getCommentsForPost);
router.post('/posts/:id/comments/add-comment', controller.addCommentToPost);
router.post('/posts/:postId/comments/:commentId/like', controller.likeComment);

module.exports = router;
