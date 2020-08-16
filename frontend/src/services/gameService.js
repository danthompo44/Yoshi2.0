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
 * A function to search for games on the server.
 * @param {string} search The search text.
 */
export async function searchForGame(search) {
    try {
        const games = await axios.get(`/games/search?search=${search}`);
        return games;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

/**
 * Function to get the top 5 rated games from the server.
 */
export async function getTop5Games() {
    try {
        const games = await axios.get('/games/top5');
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
        const game = await axios.get(`/games/game/${gameId}`);
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
 * Function to get a specific post about a game from the server using the game id.
 * @param {number} gameId The game id.
 */
export async function getGamePostByGameId(gameId) {
    try {
        const post = await axios.get(`/games/game/${gameId}/post`);
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
export async function likeCommentOnGamePost(postId, commentId, user) {
    try {
        const comment = await axios.post(
            `/games/posts/${postId}/comments/${commentId}/like`,
            {
                userId: user.id,
            },
            {
                headers: {
                    authorization: `Bearer ${user}`,
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
 * A function to unlike a comment on a post on the server.
 * The user must be logged in and have a valid token.
 * @param {number} postId The post id.
 * @param {number} commentId The comment id.
 * @param {string} userToken The users JWT token for authentication.
 */
export async function unlikeCommentOnGamePost(postId, commentId, user) {
    try {
        const comment = await axios.post(
            `/games/posts/${postId}/comments/${commentId}/unlike`,
            {
                userId: user.id,
            },
            {
                headers: {
                    authorization: `Bearer ${user}`,
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
    getGamePostByGameId,
    getGamePostComments,
    addCommentToGamePost,
    likeCommentOnGamePost,
    unlikeCommentOnGamePost,
};
