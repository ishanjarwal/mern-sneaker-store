import axios from 'axios'
import { DOMAIN } from '../app/constants';

export async function fetchWishlist() {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.get(DOMAIN + '/api/wishlist', { withCredentials: true })
            resolve(response.data)
        } catch (err) {
            reject(err.response.data);
        }
    })
}

export async function deleteFromWishlist(item_id) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.delete(DOMAIN + '/api/wishlist/' + item_id, { withCredentials: true });
            resolve(response.data)
        } catch (err) {
            reject(err.response.data);
        }
    })
}

export async function addToWishlist(product_id) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.post(DOMAIN + '/api/wishlist', { product_id }, { withCredentials: true });
            resolve(response.data)
        } catch (err) {
            reject(err.response.data);
        }
    })
}