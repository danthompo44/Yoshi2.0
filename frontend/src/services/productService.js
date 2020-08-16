import axios from '../helpers/axios';

/**
 * A function to search for either a console or game on the server.
 * @param {string} search The search text.
 */
export async function searchForProduct(search) {
    try {
        const products = await axios.get(`/products/search?search=${search}`);
        return products;
    } catch (err) {
        console.log(err);
        throw err;
    }
}
