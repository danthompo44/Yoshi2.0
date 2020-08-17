const { request, response } = require('express');
const { Op } = require('sequelize');

const {
    createErrorData,
    isDataNullOrUndefined,
    throwNotFoundError,
} = require('../helpers');
const db = require('../models');

const Console = db.Console;
const ConsolePost = db.ConsolePost;
const ConsolePostComment = db.ConsolePostComment;
const ConsolePostCommentLikes = db.ConsolePostCommentLikes;

/**
 * A method to retrieve all consoles.
 * @param {request} req Express request object.
 * @param {response} res Express response object.
 */
async function getAll(req, res) {
    try {
        const consoles = await Console.findAll();
        return res.status(200).json(consoles);
    } catch (err) {
        const error = createErrorData(err);
        return res.status(error.code).json(error.error);
    }
}

/**
 * A method to search for a console.
 * @param {request} req Express request object.
 * @param {response} res Express response object.
 */
async function searchForConsoles(req, res) {
    try {
        const consoles = await Console.findAll({
            where: {
                name: {
                    [Op.like]: `%${req.query.search}%`,
                },
            },
        });
        return res.status(200).json(consoles);
    } catch (err) {
        const error = createErrorData(err);
        return res.status(error.code).json(error.error);
    }
}

/**
 * A method to retrieve the top 5 rated consoles.
 * @param {request} req Express request object.
 * @param {response} res Express response object.
 */
async function getTop5(req, res) {
    try {
        const consoles = await Console.findAll({
            limit: 5,
            order: [['rating', 'DESC']],
        });
        return res.status(200).json(consoles);
    } catch (err) {
        const error = createErrorData(err);
        return res.status(error.code).json(error.error);
    }
}

/**
 * A method to retrieve a console by its id.
 * @param {request} req Express request object.
 * @param {response} res Express response object.
 * @param {number} req.params.id A console id.
 */
async function getById(req, res) {
    try {
        const console = await Console.findByPk(req.params.id);
        if (isDataNullOrUndefined(console)) {
            throwNotFoundError();
        }
        return res.status(200).json(console);
    } catch (err) {
        const error = createErrorData(err);
        return res.status(error.code).json(error.error);
    }
}

/**
 * A function for return all post relating to consoles.
 *  Does **not** include the comments associated with any of the posts.
 * @param {request} req Express request object.
 * @param {response} res Express response object.
 */
async function getAllPosts(req, res) {
    try {
        const consolePosts = await ConsolePost.findAll();

        if (isDataNullOrUndefined(consolePosts)) {
            throwNotFoundError(
                null,
                'ERR_POSTS_FAILED_TO_LOAD',
                'Posts failed to load'
            );
        }
        return res.status(200).json(consolePosts);
    } catch (err) {
        const error = createErrorData(err);
        return res.status(error.code).json(error.error);
    }
}

/**
 * Get a post about a console by it's id.
 * Does **not** include the comments associated with the post.
 * @param {request} req Express request object.
 * @param req.params.id Post id.
 * @param {response} res Express response object.
 */
async function getPostById(req, res) {
    try {
        const post = await ConsolePost.findByPk(req.params.id);

        if (isDataNullOrUndefined(post)) {
            throwNotFoundError(
                null,
                'ERR_POST_FAILED_TO_LOAD',
                `Post with id ${id} failed to load`
            );
        }

        return res.status(200).json(post);
    } catch (err) {
        const error = createErrorData(err);
        return res.status(error.code).json(error.error);
    }
}

/**
 * Get a post about a console by the games id.
 * Does **not** include the comments associated with the post.
 * @param {request} req Express request object.
 * @param req.params.id Game id.
 * @param {response} res Express response object.
 */
async function getPostByConsoleId(req, res) {
    try {
        const post = await ConsolePost.findOne({
            where: { console_id: req.params.id },
        });

        if (isDataNullOrUndefined(post)) {
            throwAPIError(
                404,
                'ERR_POST_FAILED_TO_LOAD',
                `Post with console id ${id} failed to load`
            );
        }

        return res.status(200).json(post);
    } catch (err) {
        const error = createErrorData(err);
        return res.status(error.code).json(error.error);
    }
}

/**
 * Get the comments for a post with a particular id.
 * @param {request} req Express request object.
 * @param req.params.id Post id.
 * @param {response} res Express response object.
 */
async function getCommentsForPost(req, res) {
    try {
        const comments = await ConsolePostComment.findAll({
            where: {
                console_post_id: req.params.id,
            },
            include: [
                {
                    model: ConsolePostCommentLikes,
                    attributes: ['id', 'user_id'],
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
 * Add a comment to a particular post.
 * @param {request} req Express request object.
 * @param req.params.id Post id.
 * @param req.body.comment Comment text.
 * @param {response} res Express response object.
 */
async function addCommentToPost(req, res) {
    try {
        // check if valid post
        const post = await ConsolePost.findByPk(req.params.id);

        if (isDataNullOrUndefined(post)) {
            throwNotFoundError(
                null,
                'ERR_POST_NOT_FOUND',
                'Post not found, so can not add a comment'
            );
        }

        // if no comment in body - throw error
        if (isDataNullOrUndefined(req.body.comment)) {
            throwMissingDataError();
        }
        const comment = await ConsolePostComment.create({
            comment: req.body.comment,
            likes: 0,
            console_post_id: req.params.id,
        });

        comment.dataValues.consolePostCommentLikes = [];

        return res.status(200).json(comment);
    } catch (err) {
        const error = createErrorData(err);
        return res.status(error.code).json(error.error);
    }
}

/**
 * Increment number of likes on a post.
 * @param {request} req Express request object.
 * @param req.params.postId Post id.
 * @param req.params.commentId Comment id.
 * @param req.body.userId User Id.
 * @param {response} res Express response object.
 */
async function likeComment(req, res) {
    try {
        // check if valid post
        const post = await ConsolePost.findByPk(req.params.postId);
        if (isDataNullOrUndefined(post)) {
            throwNotFoundError(
                null,
                'ERR_POST_NOT_FOUND',
                'Post not found, so can not like a comment'
            );
        }

        // check if valid comment
        const comment = await ConsolePostComment.findByPk(
            req.params.commentId,
            {
                include: [
                    {
                        model: ConsolePostCommentLikes,
                        attributes: ['id', 'user_id'],
                    },
                ],
            }
        );

        if (isDataNullOrUndefined(comment)) {
            throwNotFoundError(
                null,
                'ERR_COMMENT_NOT_FOUND',
                'Comment not found, so can not increment number of likes'
            );
        }

        comment.consolePostCommentLikes.forEach((c) => {
            if (c.consolePostCommentLikes.user_id === req.body.userId) {
                throwAPIError(
                    null,
                    'ERR_COMMENT_LIKED_BY_USER',
                    'This user has already liked this comment'
                );
            }
        });

        const like = await ConsolePostCommentLikes.create({
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
 * Increment number of likes on a post.
 * @param {request} req Express request object.
 * @param req.params.postId Post id.
 * @param req.params.commentId Comment id.
 * @param req.body.userId User Id.
 * @param {response} res Express response object.
 */
async function unlikeComment(req, res) {
    try {
        // check if valid post
        const post = await ConsolePost.findByPk(req.params.postId);
        if (isDataNullOrUndefined(post)) {
            throwNotFoundError(
                null,
                'ERR_POST_NOT_FOUND',
                'Post not found, so can not like a comment'
            );
        }

        // check if valid comment
        const comment = await ConsolePostComment.findByPk(req.params.commentId);

        if (isDataNullOrUndefined(comment)) {
            throwNotFoundError(
                null,
                'ERR_COMMENT_NOT_FOUND',
                'Comment not found, so can not increment number of likes'
            );
        }

        const like = await ConsolePostCommentLikes.destroy({
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

module.exports = {
    getAll,
    searchForConsoles,
    getTop5,
    getById,
    getAllPosts,
    getPostById,
    getPostByConsoleId,
    getCommentsForPost,
    addCommentToPost,
    likeComment,
    unlikeComment,
};
