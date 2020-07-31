import Axios from 'axios';

export async function signup(email, password) {}

export async function login(email, password) {
    const data = await Axios.post('http://localhost:3000/api/users/login', {
        email,
        password,
    });

    return data.data;
}

export async function refreshToken() {}
