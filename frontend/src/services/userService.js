import axios from '../helpers/axios';

/**
 * A function that creates a user on the server.
 * @param {string} email The email from the form field.
 * @param {string} password The password from the form field.
 */
export async function signup(email, password) {
    try {
        const data = await axios.post('/users/signup', {
            email,
            password,
        });

        persistUserId(data.data.id);

        return data;
    } catch (err) {
        throw err;
    }
}

/**
 * A function to login a user for the session.
 * @param {string} email The email from the form field.
 * @param {string} password The password from the form field.
 */
export async function login(email, password) {
    try {
        const data = await axios.post('/users/login', {
            email,
            password,
        });

        persistUserId(data.data.id);

        return data;
    } catch (err) {
        throw err;
    }
}

/**
 * A function to get a new JWT token from the server,
 * using the users refresh token in the cookie.
 * @param {number} userId The user id.
 */
export async function refreshToken(userId) {
    try {
        const newToken = await axios.post('/users/refresh-token', {
            userId,
        });
        return newToken;
    } catch (err) {
        throw err;
    }
}

/**
 * A function that sends a logout request to the server.
 * This will make it delete the refresh token from the cookie.
 * @param {number} userId The user id.
 */
export async function logout(userId) {
    try {
        await axios.post('/users/logout', {
            userId,
        });
        clearUserId();
    } catch (err) {
        throw err;
    }
}

/**
 * A function to save the users id in localstorage.
 * @param {number} userId The user id.
 */
function persistUserId(userId) {
    localStorage.setItem('userId', userId);
}

/**
 * A function to clear the localstorage of the users id.
 */
function clearUserId() {
    localStorage.removeItem('userId');
}

export default {
    signup,
    login,
    logout,
    refreshToken,
};
