const router = require('express').Router();
const controller = require('../controllers/consoleController');
const { verifyToken } = require('../middleware/auth');

router.get('/', controller.getAll);
router.get('/search', controller.searchForConsoles);
router.get('/top5', controller.getTop5);
router.get('/console/:id', controller.getById);
router.get('/console/:id/post', controller.getPostByConsoleId);

router.get('/posts', controller.getAllPosts);
router.get('/posts/:id', controller.getPostById);

router.get('/posts/:id/comments', controller.getCommentsForPost);
router.post(
    '/posts/:id/comments/add-comment',
    verifyToken,
    controller.addCommentToPost
);
router.post(
    '/posts/:postId/comments/:commentId/like',
    verifyToken,
    controller.likeComment
);
router.post(
    '/posts/:postId/comments/:commentId/unlike',
    verifyToken,
    controller.unlikeComment
);

module.exports = router;
