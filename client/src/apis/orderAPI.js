import axios from 'axios'
import { DOMAIN } from '../app/constants.js'

export function createOrder(data) {
    return new Promise(async (resolve, reject) => {
        try {
            const sendable = {
                ...data,
                address: data.address._id
            }
            if (data.payment_method === 'cod') {
                const response = await axios.post(`${DOMAIN}/api/order`, sendable, { withCredentials: true });
                resolve(response.data)
            } else {
                const { data } = await axios.post(`${DOMAIN}/api/order`, sendable, { withCredentials: true })
                resolve(data);
            }
        } catch (err) {
            alert('There was an error creating the order.');
            reject(new Error("Something went wrong"));
        }
    })
}


export function verifyPayment(data) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.post(`${DOMAIN}/api/order/verify-payment`, data, { withCredentials: true });
            resolve(response.data)
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

export function fetchOrder(id) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.get(`${DOMAIN}/api/order/${id}`, { withCredentials: true })
            resolve(response.data);
        } catch (err) {
            reject(err?.response.data);
        }
    })
}