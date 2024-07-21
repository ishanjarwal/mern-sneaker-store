import axios from 'axios'
import { DOMAIN } from '../app/constants.js'

export function createOrder(data) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.post(`${DOMAIN}/api/order`, data, { withCredentials: true })
            resolve(response.data);
        } catch (err) {
            reject(err?.response.data);
        }
    })
}

export function fetchOrders() {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.get(`${DOMAIN}/api/order`, { withCredentials: true })
            resolve(response.data);
        } catch (err) {
            reject(err?.response.data);
        }
    })
}