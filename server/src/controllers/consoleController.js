const { request, response } = require('express');
const { Op } = require('sequelize');

const {
    createErrorData,
    isDataNullOrUndefined,
    throwNotFoundError,
    throwAPIError,
    createConsoleObjectWithAverageRating,
} = require('../helpers');
const db = require('../models');

const Console = db.Console;
const ConsolePost = db.ConsolePost;
const ConsolePostComment = db.ConsolePostComment;
const ConsolePostCommentLikes = db.ConsolePostCommentLikes;
const UserConsoleRating = db.UserConsoleRating;
const User = db.User;

/**
 * A method to retrieve all consoles.
 * @param {request} req Express request object.
 * @param {response} res Express response object.
 */
async function getAll(req, res) {
    try {
        const consoles = await Console.findAll({
            include: [
                {
                    attributes: ['rating'],
                    model: UserConsoleRating,
                },
            ],
        });
        let consolesWithAverageRatingArray = [];
        for (let i = 0; i < consoles.length; i++) {
            consolesWithAverageRatingArray.push(
                createConsoleObjectWithAverageRating(consoles[i])
            );
        }
        return res.status(200).json(consolesWithAverageRatingArray);
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
            include: {
                model: UserConsoleRating,
                attributes: ['rating'],
            },
        });
        let consolesWithAverageRating = [];
        for (let i = 0; i < consoles.length; i++) {
            consolesWithAverageRating.push(
                createConsoleObjectWithAverageRating(consoles[i])
            );
        }
        return res.status(200).json(consolesWithAverageRating);
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
            include: {
                model: UserConsoleRating,
                attributes: ['rating'],
            },
        });
        let consolesWithAverageRating = [];
        for (let i = 0; i < consoles.length; i++) {
            consolesWithAverageRating.push(
                createConsoleObjectWithAverageRating(consoles[i])
            );
        }

        //if 5 or less consoles return the consoles with the added average rating
        if (consolesWithAverageRating.length < 6) {
            return res.status(200).json(consolesWithAverageRating);
        }

        //initiate the top5 array, lowest index and lowest value
        let top5 = [];
        let lowestIndex = 0;
        let lowestRating =
            consolesWithAverageRating[0].dataValues.averageRating;

        //iterate through 1st to 5th game and add them to top 5 array, keep track of lowest index and lowest value
        for (let i = 0; i < 5; i++) {
            {
                top5.push(consolesWithAverageRating[i]);
                if (
                    consolesWithAverageRating[i].dataValues.averageRating <
                    lowestRating
                ) {
                    lowestIndex = i;
                    lowestRating =
                        consolesWithAverageRating[i].dataValues.averageRating;
                }
            }
        }

        //iterate through remaining consoles, removing consoles with a lower average rating in the top 5 array
        for (let i = 5; i < consolesWithAverageRating.length; i++) {
            if (
                consolesWithAverageRating[i].dataValues.averageRating >
                lowestRating
            ) {
                top5.splice(lowestIndex, 1, consolesWithAverageRating[i]);
                //find the new lowest value and index
                lowestIndex = 0;
                lowestRating =
                    consolesWithAverageRating[0].dataValues.averageRating;
                for (let i = 0; i < top5.length; i++) {
                    if (top5[i].dataValues.averageRating < lowestRating) {
                        lowestIndex = i;
                        lowestRating =
                            consolesWithAverageRating[i].dataValues
                                .averageRating;
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
 * A method to retrieve a console by its id.
 * @param {request} req Express request object.
 * @param {response} res Express response object.
 * @param {number} req.params.id A console id.
 */
async function getById(req, res) {
    try {
        const console = await Console.findByPk(req.params.id, {
            include: UserConsoleRating,
            attribute: ['rating'],
        });
        if (isDataNullOrUndefined(console)) {
            throwAPIError(
                404,
                'ERR_CONSOLE_NOT_FOUND',
                `Console with id ${req.params.id} not found`
            );
        }

        //find the number of ratings
        const ratings = await UserConsoleRating.findAll({
            where: {
                console_id: req.params.id,
            },
        });

        let consoleWithRating = createConsoleObjectWithAverageRating(console);
        consoleWithRating.dataValues.ratings = ratings;

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
 * Get a post about a console by the consoles id.
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
        const post = await ConsolePost.findByPk(req.params.id);
        if (isDataNullOrUndefined(post)) {
            throwNotFoundError();
        }
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
            if (c.user_id === req.body.userId) {
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
                'Post not found, so can not unlike a comment'
            );
        }

        // check if valid comment
        const comment = await ConsolePostComment.findByPk(req.params.commentId);

        if (isDataNullOrUndefined(comment)) {
            throwNotFoundError(
                null,
                'ERR_COMMENT_NOT_FOUND',
                'Comment not found, so can not unlike a comment'
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

/**
 * A function for a user to rate a console
 * @param {request} req Express request object
 * @param {response} res Express response object
 * @param {number} req.params.consoleId A console id
 * @param {number} req.body.userId A user id
 * @param {number} req.body.rating The users rating
 */
async function rateConsoleById(req, res) {
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

        //check if the console exists
        const console = await Console.findByPk(req.params.consoleId);
        if (isDataNullOrUndefined(console)) {
            throwNotFoundError(
                null,
                'ERR_CONSOLE_NOT_FOUND',
                'The console does not exist'
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
        //check if user already has a rating for the console
        rating = await UserConsoleRating.findOne({
            where: {
                user_id: req.body.userId,
                console_id: parseInt(req.params.consoleId),
            },
        });
        if (isDataNullOrUndefined(rating)) {
            rating = await UserConsoleRating.create({
                user_id: req.body.userId,
                console_id: parseInt(req.params.consoleId),
                rating: req.body.rating,
            });
        } else {
            rating = await UserConsoleRating.update(
                {
                    user_id: req.body.userId,
                    console_id: parseInt(req.params.consoleId),
                    rating: req.body.rating,
                },
                {
                    where: {
                        user_id: req.body.userId,
                        console_id: parseInt(req.params.consoleId),
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
    rateConsoleById,
};
