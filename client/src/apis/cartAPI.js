import axios from 'axios'
import { DOMAIN } from '../app/constants.js'

export async function fetchCart(uid) {
    return new Promise(async (resolve, reject) => {
        try {
            const url = DOMAIN + '/api/cart/' + uid
            const response = await axios.get(url);
            resolve(response.data)
        } catch (err) {
            reject(err.response.data);
        }
    })

}

export async function addToCart({ user_id, data }) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.post(DOMAIN + '/api/cart/' + user_id, data)
            resolve(response.data)
        } catch (err) {
            reject(err.response.data);
        }
    })
}


export async function deleteFromCart({ user_id, product_id, size }) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.delete(DOMAIN + '/api/cart/' + user_id + "/" + product_id + "/" + size)
            resolve(response.data)
        } catch (err) {
            reject(err.response.data);
        }
    })
}

export async function updateCart({ user_id, data }) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.patch(DOMAIN + '/api/cart/' + user_id, data)
            resolve(response.data)
        } catch (err) {
            reject(err.response.data);
        }
    })
}