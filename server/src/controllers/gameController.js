const { request, response } = require('express');
const { Op } = require('sequelize');

const {
    createErrorData,
    isDataNullOrUndefined,
    throwMissingDataError,
    throwAPIError,
    throwNotFoundError,
    createGameObjectWithAverageRating,
} = require('../helpers');
const db = require('../models');
const { sequelize } = require('../models');

const Game = db.Game;
const GamePost = db.GamePost;
const GamePostComment = db.GamePostComment;
const User = db.User;
const GamePostCommentLikes = db.GamePostCommentLikes;
const UserGameRating = db.UserGameRating;

/**
 * A function to get all games.
 * @param {request} req Express request object.
 * @param {response} res Express response object.
 */
async function getAll(req, res) {
    try {
        const games = await Game.findAll({
            include: [
                {
                    attributes: ['rating'],
                    model: UserGameRating,
                },
            ],
        });
        let gamesWithAverageRatingArray = [];
        for (let i = 0; i < games.length; i++) {
            gamesWithAverageRatingArray.push(
                createGameObjectWithAverageRating(games[i])
            );
        }
        return res.status(200).json(gamesWithAverageRatingArray);
    } catch (err) {
        const error = createErrorData(err);
        return res.status(error.code).json(error.error);
    }
}

/**
 * A method to search for a game.
 * @param {request} req Express request object.
 * @param {response} res Express response object.
 */
async function searchForGames(req, res) {
    try {
        const games = await Game.findAll({
            where: {
                title: {
                    [Op.like]: `%${req.query.search}%`,
                },
            },
            include: {
                model: UserGameRating,
                attributes: ['rating'],
            },
        });
        let gamesWithAverageRating = [];
        for (let i = 0; i < games.length; i++) {
            gamesWithAverageRating.push(
                createGameObjectWithAverageRating(games[i])
            );
        }
        return res.status(200).json(gamesWithAverageRating);
    } catch (err) {
        const error = createErrorData(err);
        return res.status(error.code).json(error.error);
    }
}

/**
 * A method to retrieve the top 5 rated games.
 * @param {request} req Express request object.
 * @param {response} res Express response object.
 */
async function getTop5(req, res) {
    try {
        const games = await Game.findAll({
            include: {
                model: UserGameRating,
                attributes: ['rating'],
            },
        });
        let gamesWithAverageRating = [];
        for (let i = 0; i < games.length; i++) {
            gamesWithAverageRating.push(
                createGameObjectWithAverageRating(games[i])
            );
        }

        //if 5 or less games return the games with the added average rating
        if (gamesWithAverageRating.length < 6) {
            return res.status(200).json(gamesWithAverageRating);
        }

        //initiate the top5 array, lowest index and lowest value
        let top5 = [gamesWithAverageRating[0]];
        let lowestIndex = 0;
        let lowestRating = gamesWithAverageRating[0].dataValues.averageRating;

        //iterate through 2nd to 5th game and add them to top 5 array, keep track of lowest index and lowest value
        for (let i = 1; i < 5; i++) {
            top5.push(gamesWithAverageRating[i]);
            if (
                gamesWithAverageRating[i].dataValues.averageRating <
                lowestRating
            ) {
                lowestIndex = i;
                lowestRating =
                    gamesWithAverageRating[i].dataValues.averageRating;
            }
        }

        //iterate through remaining games, removing games with a lower average rating in the top 5 array
        for (let i = 5; i < gamesWithAverageRating.length; i++) {
            if (
                gamesWithAverageRating[i].dataValues.averageRating >
                lowestRating
            ) {
                top5.splice(lowestIndex, 1, gamesWithAverageRating[i]);
                //find the new lowest value and index
                lowestIndex = 0;
                lowestRating =
                    gamesWithAverageRating[0].dataValues.averageRating;
                for (let i = 0; i < top5.length; i++) {
                    if (top5[i].dataValues.averageRating < lowestRating) {
                        lowestIndex = i;
                        lowestRating =
                            gamesWithAverageRating[i].dataValues.averageRating;
                    }
                }
            }
        }
        return res.status(200).json(top5);
    } catch (err) {
        const error = createErrorData(err);
        return res.status(error.code).json(error.error);
    }
}

/**
 * Get a game by it's id.
 * @param {request} req Express request object.
 * @param {response} res Express response object.
 */
async function getById(req, res) {
    try {
        const game = await Game.findByPk(req.params.id, {
            include: UserGameRating,
            attribute: ['rating'],
        });
        if (isDataNullOrUndefined(game)) {
            throwAPIError(
                404,
                'ERR_GAME_NOT_FOUND',
                `Game with id ${req.params.id} not found`
            );
        }

        //find the number of ratings
        const ratings = await UserGameRating.findAll({
            where: {
                game_id: req.params.id,
            },
        });

        let gameWithRating = createGameObjectWithAverageRating(game);
        gameWithRating.dataValues.ratings = ratings;
        return res.status(200).json(gameWithRating);
    } catch (err) {
        const error = createErrorData(err);
        return res.status(error.code).json(error.error);
    }
}

/**
 * Get all posts relating to games.
 * Does **not** include the comments associated with any of the posts.
 * @param {request} req Express request object.
 * @param {response} res Express response object.
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
 * @param {request} req Express request object.
 * @param req.params.id Post id.
 * @param {response} res Express response object.
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
 * @param {request} req Express request object.
 * @param req.params.id Game id.
 * @param {response} res Express response object.
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
 * @param {request} req Express request object.
 * @param req.params.id Post id.
 * @param {response} res Express response object.
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
        if (isDataNullOrUndefined(comments)) {
            throwNotFoundError(
                null,
                'ERR_NO_COMMENTS_FOUND',
                'No comments were found for this post'
            );
        }

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

        comment.dataValues.gamePostCommentLikes = [];

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
        const comment = await GamePostComment.findByPk(req.params.commentId, {
            include: [
                {
                    model: GamePostCommentLikes,
                    attributes: ['id', 'user_id'],
                },
            ],
        });

        if (isDataNullOrUndefined(comment)) {
            throwAPIError(
                404,
                'ERR_COMMENT_NOT_FOUND',
                'Comment not found, so can not like the comment'
            );
        }

        //check if user has already liked the comment
        comment.gamePostCommentLikes.forEach((c) => {
            if (c.user_id == req.body.userId) {
                throwAPIError(
                    null,
                    'ERR_COMMENT_LIKED_BY_USER',
                    'This user has already liked this comment'
                );
            }
        });

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
        // check if valid post
        const post = await GamePost.findByPk(req.params.postId);
        if (isDataNullOrUndefined(post)) {
            throwAPIError(
                404,
                'ERR_POST_NOT_FOUND',
                'Post not found, so can not unlike a comment'
            );
        }

        // check if valid comment
        const comment = await GamePostComment.findByPk(req.params.commentId);

        if (isDataNullOrUndefined(comment)) {
            throwAPIError(
                404,
                'ERR_COMMENT_NOT_FOUND',
                'Comment not found, so can not increment number of likes'
            );
        }

        //destroy comment using user id and comment id within blog_comment_likes table in the database
        const like = await GamePostCommentLikes.destroy({
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

        return res.status(200).json(like);
    } catch (err) {
        const error = createErrorData(err);
        return res.status(error.code).json(error.error);
    }
}

/**
 * A function for a user to rate a game
 * @param {request} req Express request object
 * @param {response} res Express response object
 * @param {number} req.params.gameId A game id
 * @param {number} req.body.userId A user id
 * @param {number} req.body.rating The users rating
 */
async function rateGameById(req, res) {
    try {
        //check if the user exists
        const user = await User.findByPk(req.body.userId);
        if (isDataNullOrUndefined(user)) {
            throwNotFoundError(
                null,
                'ERR_USER_NOT_FOUND',
                'The user entered does not exist'
            );
        }

        //check if the game exists
        const game = await Game.findByPk(req.params.gameId);
        if (isDataNullOrUndefined(game)) {
            throwNotFoundError(
                null,
                'ERR_GAME_NOT_FOUND',
                'The game does not exist'
            );
        }

        //check if the rating is a number
        if (isNaN(req.body.rating)) {
            throwAPIError(
                null,
                'ERR_RATING_IS_NOT_A_NUMBER',
                'The rating entered is not a number'
            );
        }

        //check if rating is less than 0 or greater than 5
        if (req.body.rating < 0 || req.body.rating > 5) {
            throwAPIError(
                null,
                'ERR_RATING_OUT_OF_VALID_RANGE',
                'The rating entered must be between 0 and 5'
            );
        }

        let rating;
        //check if user already has a rating for the game
        rating = await UserGameRating.findOne({
            where: {
                user_id: req.body.userId,
                game_id: parseInt(req.params.gameId),
            },
        });
        if (isDataNullOrUndefined(rating)) {
            rating = await UserGameRating.create({
                user_id: req.body.userId,
                game_id: parseInt(req.params.gameId),
                rating: req.body.rating,
            });
        } else {
            rating = await UserGameRating.update(
                {
                    user_id: req.body.userId,
                    game_id: parseInt(req.params.gameId),
                    rating: req.body.rating,
                },
                {
                    where: {
                        user_id: req.body.userId,
                        game_id: parseInt(req.params.gameId),
                    },
                }
            );
        }
        res.status(200).json(rating);
    } catch (err) {
        const error = createErrorData(err);
        return res.status(error.code).json(error.error);
    }
}

module.exports = {
    getAll,
    searchForGames,
    getTop5,
    getById,
    getAllPosts,
    getPostById,
    getPostByGameId,
    getCommentsForPost,
    addCommentToPost,
    likeComment,
    unlikeComment,
    rateGameById,
};
