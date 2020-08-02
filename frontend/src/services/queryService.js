import axios from '../helpers/axios';

export async function createQuery(message, email, name) {
    try {
        const query = axios.post('/queries/query/create', {
            message,
            email,
            name,
        });
        return query;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

export default { createQuery };
