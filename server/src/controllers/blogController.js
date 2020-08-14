const {
    createErrorData,
    isDataNullOrUndefined,
    throwNotFoundError,
    throwMissingDataError,
    throwAPIError,
} = require('../helpers');
const db = require('../models');

const Blog = db.Blog;
const BlogComment = db.BlogComment;
const BlogCommentLikes = db.BlogCommentLikes;
const User = db.User;

async function getAll(req, res) {
    try {
        const blogs = await Blog.findAll();
        return res.status(200).json(blogs);
    } catch (err) {
        const data = createErrorData(err);
        return res.status(data.code).json(data.error);
    }
}

/**
 * A method to retrieve a blog by its id
 * @param {request} req Express Request Object
 * @param {response} res Express Response Object
 * @param {number} req.params.blog A blog id
 */
async function getById(req, res) {
    try {
        const blog = await Blog.findByPk(req.params.id);
        if (isDataNullOrUndefined(blog)) {
            throwNotFoundError();
        }
        return res.status(200).json(blog);
    } catch (err) {
        const error = createErrorData(err);
        return res.status(error.code).json(error.error);
    }
}

/**
 * Get the comments for a blog using the blog id.
 * @param {request} req Express request object
 * @param req.params.id blog id
 * @param {response} res Express response object
 */
async function getCommentsForBlog(req, res) {
    try {
        const comments = await BlogComment.findAll({
            where: {
                blog_id: req.params.id,
            },
            include: [
                {
                    model: BlogCommentLikes,
                },
            ],
        });

        return res.status(200).json(comments);
    } catch (err) {
        const error = createErrorData(err);
        return res.status(error.code).json(error.error);
    }
}

/**
 * Add a comment to a particular blog
 * @param {request} req Express request object
 * @param req.params.id blog id
 * @param req.body.comment Comment text
 * @param {response} res Express response object
 */
async function addCommentToBlog(req, res) {
    try {
        // check if valid post
        const blog = await Blog.findByPk(req.params.id);

        if (isDataNullOrUndefined(blog)) {
            throwNotFoundError(
                null,
                'ERR_BLOG_NOT_FOUND',
                'Blog not found, so can not add a comment'
            );
        }

        // if no comment in body - throw error
        if (isDataNullOrUndefined(req.body.comment)) {
            throwMissingDataError();
        }
        const comment = await BlogComment.create({
            comment: req.body.comment,
            likes: 0,
            blog_id: req.params.id,
        });

        return res.status(200).json(comment);
    } catch (err) {
        const error = createErrorData(err);
        return res.status(error.code).json(error.error);
    }
}

/**
 * Increment number of likes on a comment
 * @param {request} req Express request object
 * @param req.params.postId blog id
 * @param req.params.commentId Comment id
 * @param req.params.userId User Id
 * @param {response} res Express response object
 */
async function likeComment(req, res) {
    try {
        // check if valid user
        const user = await User.findAll({
            where: {
                id: req.params.userId,
            },
        });
        if (isDataNullOrUndefined(user)) {
            throwNotFoundError(
                null,
                'ERR_USER_NOT_FOUND',
                'User not found, so can not like a comment'
            );
        }

        // check if valid post
        const blog = await Blog.findByPk(req.params.blogId);
        if (isDataNullOrUndefined(blog)) {
            throwNotFoundError(
                null,
                'ERR_BLOG_NOT_FOUND',
                'Blog not found, so can not like a comment'
            );
        }

        // check if valid comment
        const comment = await BlogComment.findAll({
            where: {
                id: req.params.commentId,
            },
            include: [
                {
                    model: BlogCommentLikes,
                },
            ],
        });
        if (isDataNullOrUndefined(comment)) {
            throwNotFoundError(
                null,
                'ERR_COMMENT_NOT_FOUND',
                'Comment not found, so can not increment number of likes'
            );
        }
        //checks to see if the user trying to like the comment has already liked it
        for (let i = 0; i < comment[0].blogCommentLikes.length; i++) {
            // return res.status(200).json(comment[0].blogCommentLikes[i].user_id);
            if (comment[0].blogCommentLikes[i].user_id == req.params.userId) {
                throwAPIError(
                    null,
                    'ERR_COMMENT_LIKED_BY_USER',
                    'This user has already liked this comment'
                );
            }
        }

        const like = await BlogCommentLikes.create({
            comment_id: req.params.commentId,
            user_id: req.params.userId,
        });

        return res.status(200).json(like);
    } catch (err) {
        const error = createErrorData(err);
        return res.status(error.code).json(error.error);
    }
}

module.exports = {
    getAll,
    getById,
    getCommentsForBlog,
    addCommentToBlog,
    likeComment,
};
