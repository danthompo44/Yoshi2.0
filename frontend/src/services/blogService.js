import axios from '../helpers/axios';

/**
 * Function to get all the blogs from the server.
 */
export async function getAllBlogs() {
    try {
        const blogs = await axios.get('/blogs/');
        return blogs;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

/**
 * A function to search for blogs on the server.
 * @param {string} search The search text.
 */
export async function searchForBlog(search) {
    try {
        const blogs = await axios.get(`/blogs/search?search=${search}`);
        return blogs;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

/**
 * Function to get a specific blog from the server.
 * @param {number} blogId The console id.
 */
export async function getBlogById(blogId) {
    try {
        const blog = await axios.get(`/blogs/blog/${blogId}`);
        return blog;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

/**
 * Function to get all the comments for a blog from the server.
 * @param {number} blogId The blog id.
 */
export async function getBlogComments(blogId) {
    try {
        const comments = await axios.get(`/blogs/blog/${blogId}/comments`);
        return comments;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

/**
 * A function to add a comment to a blog on the server.
 * The user must be logged in and have a valid token.
 * @param {number} blogId The blog id.
 * @param {string} commentText The text of the comment.
 * @param {string} userToken The users JWT token for authentication.
 */
export async function addCommentToBlog(blogId, commentText, userToken) {
    try {
        const comment = await axios.post(
            `/blogs/blog/${blogId}/comments/add-comment`,
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
 * A function to like a comment on a blog on the server.
 * The user must be logged in and have a valid token.
 * @param {number} blogId The blog id.
 * @param {number} commentId The comment id.
 * @param {{id: string, token: string}} user The user of the application. Must contain the id and token.
 */
export async function likeCommentOnBlog(blogId, commentId, user) {
    try {
        const comment = await axios.post(
            `/blogs/blog/${blogId}/comments/${commentId}/like`,
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
 * A function to unlike a comment on a blog on the server.
 * The user must be logged in and have a valid token.
 * @param {number} blogId The blog id.
 * @param {number} commentId The comment id.
 * @param {{id: string, token: string}} user The user of the application. Must contain the id and token.
 */
export async function unlikeCommentOnBlog(blogId, commentId, user) {
    try {
        const comment = await axios.post(
            `blogs/blog/${blogId}/comments/${commentId}/unlike`,
            {
                userId: user.id,
            },
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
    getAllBlogs,
    getBlogById,
    getBlogComments,
    likeCommentOnBlog,
    unlikeCommentOnBlog,
};
