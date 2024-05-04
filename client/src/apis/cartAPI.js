import axios from 'axios'

export async function fetchCart(uid) {
    try {
        const url = 'http://localhost:8080/api/cart/' + uid
        const response = await axios.get(url);
        return response.data
    } catch (err) {
        throw new Error(err.response.data.errMessage)
    }

}

export async function addToCart({ user_id, data }) {
    try {
        const response = await axios.post('http://localhost:8080/api/cart/' + user_id, data)
        return response.data;
    } catch (err) {
        throw new Error(err.response.data.apiErrorMessage)
    }
}


export async function deleteFromCart({ user_id, product_id, size }) {
    try {
        const response = await axios.delete('http://localhost:8080/api/cart/' + user_id + "/" + product_id + "/" + size)
        return response.data
    } catch (err) {
        throw new Error(err.response.data.apiErrorMessage)
    }
}

export async function updateCart({ user_id, data }) {
    try {
        const response = await axios.patch('http://localhost:8080/api/cart/' + user_id, data)
        return response.data
    } catch (err) {
        throw err
    }
}