import axios from '../helpers/axios';

/**
 * Function to get all the consoles from the server.
 */
export async function getAllConsoles() {
    try {
        const consoles = await axios.get('/consoles/');
        return consoles;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

/**
 * A function to search for consoles on the server.
 * @param {string} search The search text.
 */
export async function searchForConsole(search) {
    try {
        const consoles = await axios.get(`/consoles/search?search=${search}`);
        return consoles;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

/**
 * Function to get the top 5 rated consoles from the server.
 */
export async function getTop5Consoles() {
    try {
        const consoles = await axios.get('/consoles/top5');
        return consoles;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

/**
 * Function to get a specific console from the server.
 * @param {number} consoleId The console id.
 */
export async function getConsoleById(consoleId) {
    try {
        const console = await axios.get(`/consoles/console/${consoleId}`);
        return console;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

/**
 * Function to get all the posts from the server.
 */
export async function getAllConsolePosts() {
    try {
        const consolePosts = await axios.get('/consoles/posts');
        return consolePosts;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

/**
 * Function to get a specific post about a console from the server.
 * @param {number} postId The post id.
 */
export async function getConsolePostById(postId) {
    try {
        const post = await axios.get(`/consoles/posts/${postId}`);
        return post;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

/**
 * Function to get a specific post about a console from the server.
 * @param {number} consoleId The post id.
 */
export async function getConsolePostByConsoleId(consoleId) {
    try {
        const post = await axios.get(`/consoles/console/${consoleId}/post`);
        return post;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

/**
 * Function to get all the comments for a post about a console from the server.
 * @param {number} postId The post id.
 */
export async function getConsolePostComments(postId) {
    try {
        const comments = await axios.get(`/consoles/posts/${postId}/comments`);
        return comments;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

/**
 * A function to add a comment to a post about a console on the server.
 * The user must be logged in and have a valid token.
 * @param {number} postId The post id.
 * @param {string} commentText The text of the comment.
 * @param {string} userToken The users JWT token for authentication.
 */
export async function addCommentToConsolePost(postId, commentText, userToken) {
    try {
        const comment = await axios.post(
            `/consoles/posts/${postId}/comments/add-comment`,
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
 * @param {{id: string, token: string}} user The user of the application. Must contain the id and token.
 */
export async function likeCommentOnConsolePost(postId, commentId, user) {
    try {
        const comment = await axios.post(
            `/consoles/posts/${postId}/comments/${commentId}/like`,
            { userId: user.id },
            {
                headers: {
                    authorization: `Bearer ${user.token}`,
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
 * @param {{id: string, token: string}} user The user of the application. Must contain the id and token.
 */
export async function unlikeCommentOnConsolePost(postId, commentId, user) {
    try {
        const comment = await axios.post(
            `/consoles/posts/${postId}/comments/${commentId}/unlike`,
            { userId: user.id },
            {
                headers: {
                    authorization: `Bearer ${user.token}`,
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
    getAllConsoles,
    getConsoleById,
    getAllConsolePosts,
    getConsolePostById,
    getConsolePostByConsoleId,
    getConsolePostComments,
    addCommentToConsolePost,
    likeCommentOnConsolePost,
    unlikeCommentOnConsolePost,
};
