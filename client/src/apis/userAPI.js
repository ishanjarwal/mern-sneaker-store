import axios from "axios";
import { DOMAIN } from "../app/constants";

export async function createUser(data) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.post(DOMAIN + '/api/user/', data);
            resolve(response.data) // has message and user
        } catch (err) {
            reject(err.response.data);
        }
    })
}

export async function loginUser(data) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.post(DOMAIN + '/api/user/login', data, { withCredentials: true });
            resolve(response.data) // has message and user
        } catch (err) {
            reject(err.response.data)
        }
    })
}

export async function logoutUser() {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.get(DOMAIN + '/api/user/logout', { withCredentials: true });
            resolve(response.data)
        } catch (err) {
            reject(err.response.data);
        }
    })
}

export async function checkAuth() {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.get(DOMAIN + '/api/user/check-auth', { withCredentials: true });
            resolve(response.data)
        } catch (err) {
            reject(err.response.data);
        }
    })
}

export async function deleteUserAddress(id) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.delete(DOMAIN + `/api/user/address/${id}`, { withCredentials: true });
            resolve(response.data)
        } catch (err) {
            reject(err.response.data);
        }
    })
}

export async function updateUserAddress(data) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.patch(DOMAIN + `/api/user/address`, data, { withCredentials: true });
            resolve(response.data)
        } catch (err) {
            reject(err.response.data);
        }
    })
}

export async function updateUser(data) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.patch(DOMAIN + `/api/user`, data, { withCredentials: true });
            resolve(response.data)
        } catch (err) {
            reject(err.response.data);
        }
    })
}

export async function fetchUsers() {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.get(DOMAIN + `/api/user`, { withCredentials: true });
            resolve(response.data)
        } catch (err) {
            reject(err.response.data);
        }
    })
}

export async function setPasswordResetToken() {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.get(DOMAIN + `/api/user/password-token`, { withCredentials: true });
            resolve(response.data);
        } catch (err) {
            reject(err.response.data);
        }
    })
}

export async function resetPassword({ password, token }) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.post(DOMAIN + `/api/user/reset-password/${token}`, { password }, { withCredentials: true });
            resolve(response.data);
        } catch (err) {
            reject(err.response.data);
        }
    })
}