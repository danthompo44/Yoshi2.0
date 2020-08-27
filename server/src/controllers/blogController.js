const { request, response } = require('express');
const { Op } = require('sequelize');

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

/**
 * A method to get all blogs from the database.
 * @param {request} req Express request object.
 * @param {response} res Express response object.
 */
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
 * A method to retrieve a blog by its id.
 * @param {request} req Express request object.
 * @param {response} res Express response object.
 * @param {number} req.params.blog A blog id.
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
 * @param {request} req Express request object.
 * @param req.params.id Blog id.
 * @param {response} res Express response object.
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
                    attributes: ['id', 'user_id'],
                },
            ],
        });
        if (isDataNullOrUndefined(comments)) {
            throwNotFoundError();
        }

        return res.status(200).json(comments);
    } catch (err) {
        const error = createErrorData(err);
        return res.status(error.code).json(error.error);
    }
}

/**
 * Add a comment to a particular blog.
 * @param {request} req Express request object.
 * @param req.params.id Blog id.
 * @param req.body.comment Comment text.
 * @param {response} res Express response object.
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
            blog_id: req.params.id,
        });

        comment.dataValues.blogCommentLikes = [];
        return res.status(200).json(comment);
    } catch (err) {
        const error = createErrorData(err);
        return res.status(error.code).json(error.error);
    }
}

/**
 * Increment number of likes on a comment.
 * @param {request} req Express request object.
 * @param req.params.blogId Blog id.
 * @param req.params.commentId Comment id.
 * @param req.body.userId User Id.
 * @param {response} res Express response object.
 */
async function likeComment(req, res) {
    try {
        // check if valid blog
        const blog = await Blog.findByPk(req.params.blogId);
        if (isDataNullOrUndefined(blog)) {
            throwNotFoundError(
                null,
                'ERR_BLOG_NOT_FOUND',
                'Blog not found, so can not like a comment'
            );
        }

        // check if valid comment
        const comment = await BlogComment.findByPk(req.params.commentId, {
            include: [
                {
                    model: BlogCommentLikes,
                    attributes: ['id', 'user_id'],
                },
            ],
        });

        if (isDataNullOrUndefined(comment)) {
            throwNotFoundError(
                null,
                'ERR_COMMENT_NOT_FOUND',
                'Comment not found, so can not like a comment'
            );
        }

        // checks to see if the user trying to like the comment has already liked it
        comment.blogCommentLikes.forEach((c) => {
            if (c.user_id === parseInt(req.body.userId)) {
                throwAPIError(
                    null,
                    'ERR_COMMENT_LIKED_BY_USER',
                    'This user has already liked this comment'
                );
            }
        });

        const like = await BlogCommentLikes.create({
            comment_id: req.params.commentId,
            user_id: req.body.userId,
        });

        return res.status(200).json(like);
    } catch (err) {
        const error = createErrorData(err);
        return res.status(error.code).json(error.error);
    }
}

/**
 * Remove the logged in users like on a comment if valid.
 * @param {request} req Express request object.
 * @param req.params.commentId Comment id.
 * @param req.params.blogId Blog id.
 * @param req.body.userId User Id.
 * @param {response} res Express response object.
 */
async function unlikeComment(req, res) {
    try {
        // check if valid blog
        const blog = await Blog.findByPk(req.params.blogId);
        if (isDataNullOrUndefined(blog)) {
            throwNotFoundError(
                null,
                'ERR_BLOG_NOT_FOUND',
                'Blog not found, so can not unlike a comment'
            );
        }

        // check if valid comment
        const comment = await BlogComment.findByPk(req.params.commentId);

        if (isDataNullOrUndefined(comment)) {
            throwNotFoundError(
                null,
                'ERR_COMMENT_NOT_FOUND',
                'Comment not found, so can not unlike a comment'
            );
        }

        // destroy comment using user id and comment id within blog_comment_likes table in the database
        const like = await BlogCommentLikes.destroy({
            where: {
                comment_id: req.params.commentId,
                user_id: req.body.userId,
            },
        });

        if (isDataNullOrUndefined(like)) {
            throwNotFoundError(
                null,
                'ERR_LIKE_NOT_FOUND',
                'Like not found, so can not unlike a comment'
            );
        }

        res.status(200).json(like);
    } catch (err) {
        const error = createErrorData(err);
        return res.status(error.code).json(error.error);
    }
}

/**
 * Search for a blog by the search criteria
 * @param {request} req Express request object
 * @param req.params.search The search criteria
 * @param {response} res Express response object
 */
async function searchForBlog(req, res) {
    try {
        const blogs = await Blog.findAll({
            where: {
                [Op.or]: [
                    {
                        title: {
                            [Op.like]: `%${req.query.search}%`,
                        },
                    },
                    {
                        subtitle: {
                            [Op.like]: `%${req.query.search}%`,
                        },
                    },
                ],
            },
        });

        res.status(200).json(blogs);
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
    unlikeComment,
    searchForBlog,
};
