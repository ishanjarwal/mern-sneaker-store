import axios from "axios";

export async function createUser(data) {
    try {
        const response = await axios.post('http://localhost:8080/api/user/', data);
        return response.data // has message and user
    } catch (err) {
        throw new Error(err.response.data.apiErrorMessage)

    }
}

export async function loginUser(data) {
    try {
        const response = await axios.post('http://localhost:8080/api/user/login', data, { withCredentials: true });
        return response.data // has message and user
    } catch (err) {
        throw new Error(err.response.data.apiErrorMessage)
    }
}

export async function logoutUser() {
    try {
        const response = await axios.get('http://localhost:8080/api/user/logout', { withCredentials: true });
        return response.data
    } catch (err) {
        throw new Error(err.response.data.apiErrorMessage)
    }
}

export async function checkAuth() {
    try {
        const response = await axios.get('http://localhost:8080/api/user/check-auth', { withCredentials: true });
        return response.data
    } catch (err) {
        throw new Error(err.response.data.apiErrorMessage)
    }
}


export async function updateUserAddress({ user_id, data }) {
    try {
        const response = await axios.patch(`http://localhost:8080/api/user/address/${user_id}`, data, { withCredentials: true });
        return response.data
    } catch (err) {
        throw new Error(err.response.data.apiErrorMessage)

    }
}

export async function updateUser({ user_id, data }) {
    try {
        const response = await axios.patch(`http://localhost:8080/api/user/${user_id}`, data, { withCredentials: true });
        return response.data
    } catch (err) {
        throw new Error(err.response.data.apiErrorMessage)

    }
}