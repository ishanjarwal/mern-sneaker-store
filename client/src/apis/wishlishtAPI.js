import axios from 'axios'
import { DOMAIN } from '../app/constants';

export async function fetchWishlist(user_id) {
    try {
        const response = await axios.get(DOMAIN + '/api/wishlist/' + user_id)
        return response.data
    } catch (err) {
        throw new Error(err.response.data.apiErrorMessage);
    }
}

export async function deleteFromWishlist({ user_id, product_id }) {
    try {
        const response = await axios.delete(DOMAIN + '/api/wishlist/' + user_id + "/" + product_id);
        return response.data
    } catch (err) {
        throw new Error(err.response.data.apiErrorMessage);
    }
}

export async function addToWishlist({ user_id, product_id }) {
    try {
        const response = await axios.post(DOMAIN + '/api/wishlist/' + user_id, { product_id });
        return response.data
    } catch (err) {
        throw new Error(err.response.data.apiErrorMessage);
    }
}