import axios from 'axios'
import { DOMAIN } from '../app/constants';

export async function fetchWishlist(user_id) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.get(DOMAIN + '/api/wishlist/' + user_id)
            resolve(response.data)
        } catch (err) {
            reject(err.response.data);
        }
    })
}

export async function deleteFromWishlist({ user_id, product_id }) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.delete(DOMAIN + '/api/wishlist/' + user_id + "/" + product_id);
            resolve(response.data)
        } catch (err) {
            reject(err.response.data);
        }
    })
}

export async function addToWishlist({ user_id, product_id }) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.post(DOMAIN + '/api/wishlist/' + user_id, { product_id });
            resolve(response.data)
        } catch (err) {
            reject(err.response.data);
        }
    })
}