import axios from '../helpers/axios';

/**
 * Function to get all the games from the server.
 */
export async function getAllGames() {
    try {
        const games = await axios.get('/games/');
        return games;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

/**
 * Function to get a specific game from the server.
 * @param {number} gameId The game id.
 */
export async function getGameById(gameId) {
    try {
        const game = await axios.get(`/games/${gameId}`);
        return game;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

/**
 * Function to get all the posts from the server.
 */
export async function getAllGamePosts() {
    try {
        const gamePosts = await axios.get('/games/posts');
        return gamePosts;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

/**
 * Function to get a specific post about a game from the server.
 * @param {number} postId The post id.
 */
export async function getGamePostById(postId) {
    try {
        const post = await axios.get(`/games/posts/${postId}`);
        return post;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

/**
 * Function to get all the comments for a post about a game from the server.
 * @param {number} postId The post id.
 */
export async function getGamePostComments(postId) {
    try {
        const comments = await axios.get(`/games/posts/${postId}/comments`);
        return comments;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

/**
 * A function to add a comment to a post about a game on the server.
 * The user must be logged in and have a valid token.
 * @param {number} postId The post id.
 * @param {string} commentText The text of the comment.
 * @param {string} userToken The users JWT token for authentication.
 */
export async function addCommentToGamePost(postId, commentText, userToken) {
    try {
        const comment = await axios.post(
            `/games/posts/${postId}/comments/add-comment`,
            {
                comment: commentText,
            },
            {
                headers: {
                    authorization: `Bearer ${userToken}`,
                },
            }
        );
        return comment;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

/**
 * A function to like a comment on a post on the server.
 * The user must be logged in and have a valid token.
 * @param {number} postId The post id.
 * @param {number} commentId The comment id.
 * @param {string} userToken The users JWT token for authentication.
 */
export async function likeCommentOnGamePost(postId, commentId, userToken) {
    try {
        const comment = await axios.post(
            `/games/posts/${postId}/comments/${commentId}/like`,
            null,
            {
                headers: {
                    authorization: `Bearer ${userToken}`,
                },
            }
        );
        return comment;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

export default {
    getAllGames,
    getGameById,
    getAllGamePosts,
    getGamePostById,
    getGamePostComments,
    addCommentToGamePost,
    likeCommentOnGamePost,
};
