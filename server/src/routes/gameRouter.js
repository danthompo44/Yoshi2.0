const router = require('express').Router();
const controller = require('../controllers/gameController');
const { verifyToken } = require('../middleware/auth');

router.get('/', controller.getAll);
router.get('/game/:id', controller.getById);

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

module.exports = router;
