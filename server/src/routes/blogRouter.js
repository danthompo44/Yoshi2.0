const router = require('express').Router();
const controller = require('../controllers/blogController');
const { verifyToken } = require('../middleware/auth');

router.get('/', controller.getAll);
router.get('/blog/:id', controller.getById);

router.get('/blog/:id/comments', controller.getCommentsForBlog);
router.post(
    '/blog/:id/comments/add-comment',
    verifyToken,
    controller.addCommentToBlog
);
router.post(
    '/blog/:blogId/comments/:commentId/like',
    verifyToken,
    controller.likeComment
);
router.post(
    '/blog/:blogId/comments/:commentId/unlike',
    verifyToken,
    controller.unlikeComment
);

router.get('/search', controller.searchForBlog);

module.exports = router;
