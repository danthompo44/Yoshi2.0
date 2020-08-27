import Axios from 'axios';

const axios = Axios.create({
    baseURL: 'http://localhost:3000/api',
    withCredentials: true,
});

export default axios;
