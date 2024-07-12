import axios from 'axios'
import { DOMAIN } from '../app/constants.js'

export async function fetchCart() {
    return new Promise(async (resolve, reject) => {
        try {
            const url = DOMAIN + '/api/cart/'
            const response = await axios.get(url, { withCredentials: true });
            resolve(response.data)
        } catch (err) {
            reject(err.response.data);
        }
    })
}

export async function filterCart() {
    return new Promise(async (resolve, reject) => {
        try {
            const url = DOMAIN + '/api/cart/filter-cart/'
            const response = await axios.get(url, { withCredentials: true });
            resolve(response.data)
        } catch (err) {
            reject(err.response.data);
        }
    })
}

export async function addToCart(data) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.post(DOMAIN + '/api/cart', data, { withCredentials: true })
            resolve(response.data)
        } catch (err) {
            reject(err.response.data);
        }
    })
}


export async function deleteFromCart(item_id) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.delete(DOMAIN + '/api/cart/' + item_id, { withCredentials: true })
            resolve(response.data)
        } catch (err) {
            reject(err.response.data);
        }
    })
}

export async function updateCart({ item_id, data }) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.patch(DOMAIN + '/api/cart/' + item_id, data, { withCredentials: true })
            resolve(response.data)
        } catch (err) {
            reject(err.response.data);
        }
    })
}