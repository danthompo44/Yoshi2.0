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

export default {getAllBlogs};