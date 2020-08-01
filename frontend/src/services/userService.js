import axios from '../helpers/axios';

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

function persistUserId(userId) {
    localStorage.setItem('userId', userId);
}

function clearUserId() {
    localStorage.removeItem('userId');
}

export default {
    signup,
    login,
    logout,
    refreshToken,
};
