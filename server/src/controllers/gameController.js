const { request, response } = require('express');
const {
    createErrorData,
    isDataNullOrUndefined,
    throwMissingDataError,
    throwNotFoundError,
} = require('../helpers');
const db = require('../models');

const Game = db.Game;
const GamePost = db.GamePost;
const GamePostComment = db.GamePostComment;

/**
 * A function to get all games
 * @param {request} req Express request object
 * @param {response} res Express response object
 */
async function getAll(req, res) {
    try {
        const games = await Game.findAll();

        return res.status(200).json(games);
    } catch (err) {
        const error = createErrorData(err);
        return res.status(error.code).json(error.error);
    }
}

/**
 * Get a game by it's id
 * @param {request} req Express request object
 * @param {response} res Express response object
 */
async function getById(req, res) {
    try {
        const game = await Game.findByPk(req.params.id);
        if (isDataNullOrUndefined(game)) {
            throw {
                code: 404,
                name: 'ERR_GAME_NOT_FOUND',
                message: `Game with id ${req.params.id} not found`,
            };
        }
        return res.status(200).json(game);
    } catch (err) {}
}

/**
 * Get all posts relating to games.
 * Does **not** include the comments associated with any of the posts
 * @param {request} req Express request object
 * @param {response} res Express response object
 */
async function getAllPosts(req, res) {
    try {
        const gamePosts = await GamePost.findAll();

        if (isDataNullOrUndefined(gamePosts)) {
            throwNotFoundError(
                null,
                'ERR_POSTS_FAILED_TO_LOAD',
                'Posts failed to load'
            );
        }
        return res.status(200).json(gamePosts);
    } catch (err) {
        const error = createErrorData(err);
        return res.status(error.code).json(error.error);
    }
}

/**
 * Get a post about a game by it's id.
 * Does **not** include the comments associated with the post.
 * @param {request} req Express request object
 * @param req.params.id Post id
 * @param {response} res Express response object
 */
async function getPostById(req, res) {
    try {
        const post = await GamePost.findByPk(req.params.id);

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
 * Get the comments for a post with a particular id.
 * @param {request} req Express request object
 * @param req.params.id Post id
 * @param {response} res Express response object
 */
async function getCommentsForPost(req, res) {
    try {
        const comments = await GamePostComment.findAll({
            where: {
                game_post_id: req.params.id,
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
        const post = await GamePost.findByPk(req.params.id);

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

        const comment = await GamePostComment.create({
            comment: req.body.comment,
            likes: 0,
            game_post_id: req.params.id,
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
 * @param req.body.commentId Comment id
 * @param {response} res Express response object
 */
async function likeComment(req, res) {
    try {
        // check if valid post
        const post = await GamePost.findByPk(req.params.postId);
        if (isDataNullOrUndefined(post)) {
            throwNotFoundError(
                null,
                'ERR_POST_NOT_FOUND',
                'Post not found, so can not like a comment'
            );
        }

        // check if valid comment
        const comment = await GamePostComment.findByPk(req.params.commentId);
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
    getCommentsForPost,
    addCommentToPost,
    likeComment,
};
