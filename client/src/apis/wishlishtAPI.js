import axios from 'axios'

export async function fetchWishlist(user_id) {
    try {
        const response = await axios.get('http://localhost:8080/api/wishlist/' + user_id)
        return response.data
    } catch (err) {
        throw new Error(err.response.data.apiErrorMessage);
    }
}

export async function deleteFromWishlist({ user_id, product_id }) {
    try {
        const response = await axios.delete('http://localhost:8080/api/wishlist/' + user_id + "/" + product_id);
        return response.data
    } catch (err) {
        throw new Error(err.response.data.apiErrorMessage);
    }
}

export async function addToWishlist({ user_id, product_id }) {
    try {
        const response = await axios.post('http://localhost:8080/api/wishlist/' + user_id, { product_id });
        return response.data
    } catch (err) {
        throw new Error(err.response.data.apiErrorMessage);
    }
}