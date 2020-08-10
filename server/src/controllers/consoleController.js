const { request, response } = require('express');

const {
    createErrorData,
    isDataNullOrUndefined,
    throwNotFoundError,
} = require('../helpers');
const db = require('../models');

const Console = db.Console;
const ConsolePost = db.ConsolePost;
const ConsolePostComment = db.ConsolePostComment;

/**
 * A method to retrieve all consoles
 * @param {request} req Express Request Object
 * @param {response} res Express Response Object
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
 * A method to retrieve a console by its id
 * @param {request} req Express Request Object
 * @param {response} res Express Response Object
 * @param {number} req.params.id A console id
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
 * A function for return all post relating to consoles
 *  Does **not** include the comments associated with any of the posts
 * @param {request} req Express request object
 * @param {response} res Express response object
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
 * @param {request} req Express request object
 * @param req.params.id Post id
 * @param {response} res Express response object
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
 * @param {request} req Express request object
 * @param req.params.id Game id
 * @param {response} res Express response object
 */
async function getPostByConsoleId(req, res) {
    try {
        const post = await ConsolePost.findOne(({where : {console_id : req.params.id}}));

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
 * @param {request} req Express request object
 * @param req.params.id Post id
 * @param {response} res Express response object
 */
async function getCommentsForPost(req, res) {
    try {
        const comments = await ConsolePostComment.findAll({
            where: {
                console_post_id: req.params.id,
            },
        });

        return res.status(200).json(comments);
    } catch (err) {
        const error = createErrorData(err);
        return res.status(error.code).json(error.error);
    }
}

/**
 * Add a comment to a particular post
 * @param {request} req Express request object
 * @param req.params.id Post id
 * @param req.body.comment Comment text
 * @param {response} res Express response object
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

        return res.status(200).json(comment);
    } catch (err) {
        const error = createErrorData(err);
        return res.status(error.code).json(error.error);
    }
}

/**
 * Increment number of likes on a post
 * @param {request} req Express request object
 * @param req.params.postId Post id
 * @param req.params.commentId Comment id
 * @param {response} res Express response object
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
        const comment = await ConsolePostComment.findByPk(req.params.commentId);
        if (isDataNullOrUndefined(comment)) {
            throwNotFoundError(
                null,
                'ERR_COMMENT_NOT_FOUND',
                'Comment not found, so can not increment number of likes'
            );
        }
        await comment.increment('likes');

        const updatedComment = {
            ...comment.get(),
            likes: comment.get().likes + 1,
        };
        return res.status(200).json(updatedComment);
    } catch (err) {
        const error = createErrorData(err);
        return res.status(error.code).json(error.error);
    }
}

module.exports = {
    getAll,
    getById,
    getAllPosts,
    getPostById,
    getPostByConsoleId,
    getCommentsForPost,
    addCommentToPost,
    likeComment,
};
