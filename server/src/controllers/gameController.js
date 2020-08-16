const { request, response } = require('express');
const {
    createErrorData,
    isDataNullOrUndefined,
    throwMissingDataError,
    throwAPIError,
    throwNotFoundError,
    isArrayEmpty,
} = require('../helpers');
const db = require('../models');

const Game = db.Game;
const GamePost = db.GamePost;
const GamePostComment = db.GamePostComment;
const User = db.User;
const GamePostCommentLikes = db.GamePostCommentLikes;

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
 * A method to retrieve the top 5 rated games
 * @param {request} req Express Request Object
 * @param {response} res Express Response Object
 */
async function getTop5(req, res) {
    try {
        const games = await Game.findAll({
            limit: 5,
            order: [['rating', 'DESC']],
        });
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
            throwAPIError(
                404,
                'ERR_GAME_NOT_FOUND',
                `Game with id ${req.params.id} not found`
            );
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
            throwAPIError(
                404,
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
            throwAPIError(
                404,
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
 * Get a post about a game by the games id.
 * Does **not** include the comments associated with the post.
 * @param {request} req Express request object
 * @param req.params.id Game id
 * @param {response} res Express response object
 */
async function getPostByGameId(req, res) {
    try {
        const post = await GamePost.findOne({
            where: { game_id: req.params.id },
        });

        if (isDataNullOrUndefined(post)) {
            throwAPIError(
                404,
                'ERR_POST_FAILED_TO_LOAD',
                `Post with game id ${id} failed to load`
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
            include: [
                {
                    model: GamePostCommentLikes,
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
            throwAPIError(
                404,
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
 * Increment number of likes on a post if a user is logged in
 * @param {request} req Express request object
 * @param req.params.postId Post id
 * @param req.body.commentId Comment id
 * @param req.body.userId User id
 * @param {response} res Express response object
 */
async function likeComment(req, res) {
    try {
        // check if valid user
        const user = await User.findByPk(req.body.userId);
        if (isDataNullOrUndefined(user)) {
            throwNotFoundError(
                null,
                'ERR_USER_NOT_FOUND',
                'User not found, so can not like a comment'
            );
        }
        // check if valid post
        const post = await GamePost.findByPk(req.params.postId);
        if (isDataNullOrUndefined(post)) {
            throwAPIError(
                404,
                'ERR_POST_NOT_FOUND',
                'Post not found, so can not like a comment'
            );
        }

        // check if valid comment
        const comment = await GamePostComment.findAll({
            where: {
                id: req.params.commentId,
            },
            include: [
                {
                    model: GamePostCommentLikes,
                    attributes: ['id', 'user_id'],
                },
            ],
        });

        if (isArrayEmpty(comment)) {
            throwAPIError(
                404,
                'ERR_COMMENT_NOT_FOUND',
                'Comment not found, so can not increment number of likes'
            );
        }

        //check if user has already liked the comment
        let likesArray = comment[0].gamePostCommentLikes;
        for (let i = 0; i < likesArray.length; i++) {
            if (likesArray[i].user_id == req.body.userId) {
                throwAPIError(
                    null,
                    'ERR_COMMENT_LIKED_BY_USER',
                    'This user has already liked this comment'
                );
            }
        }

        //create entry in database
        const like = await GamePostCommentLikes.create({
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
 * Remove the logged in users like on a game post comment if valid
 * @param {request} req Express request object
 * @param req.params.commentId Comment id
 * @param req.params.postId game id
 * @param req.body.userId User Id
 * @param {response} res Express response object
 */
async function unlikeComment(req, res) {
    try {
        // check if valid user
        const user = await User.findByPk(req.body.userId);
        if (isDataNullOrUndefined(user)) {
            throwNotFoundError(
                null,
                'ERR_USER_NOT_FOUND',
                'User not found, so can not unlike a comment'
            );
        }

        // check if valid blog, inner join Blog Comments and Blog Comment likes to the query, reduce network requests
        const blog = await Blog.findOne({
            where: {
                id: req.params.blogId,
            },
            include: [
                {
                    model: BlogComment,
                    include: [
                        {
                            model: BlogCommentLikes,
                        },
                    ],
                },
            ],
        });
        if (isDataNullOrUndefined(blog)) {
            throwNotFoundError(
                null,
                'ERR_BLOG_NOT_FOUND',
                'Blog not found, so can not unlike a comment'
            );
        }

        // check if valid comment using the previous inner join query on the database
        let commentExists = () => {
            for (let i = 0; i < blog.blogComments.length; i++) {
                if (
                    blog.blogComments[i].id === parseInt(req.params.commentId)
                ) {
                    return true;
                }
            }
            return false;
        };
        if (!commentExists) {
            throwNotFoundError(
                null,
                'ERR_COMMENT_NOT_FOUND',
                'Comment not found, so can not unlike a comment'
            );
        }

        //destroy comment using user id and comment id within blog_comment_likes table in the database
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

module.exports = {
    getAll,
    getTop5,
    getById,
    getAllPosts,
    getPostById,
    getPostByGameId,
    getCommentsForPost,
    addCommentToPost,
    likeComment,
    unlikeComment,
};
