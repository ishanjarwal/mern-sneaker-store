import axios from "axios";
import { DOMAIN } from "../app/constants";

const url = `${DOMAIN}/api/category`;

export async function createCategory(name) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.post(url, { name })
            resolve(response.data)
        } catch (err) {
            reject(err.response.data);
        }
    })
}

export async function updateCategory({ id, name }) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.patch(url, { id, name })
            resolve(response.data)
        } catch (err) {
            reject(err.response.data);
        }
    })
}

export async function fetchCategories() {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.get(url);
            resolve(response.data)
        } catch (err) {
            reject(err.response.data);
        }
    })
}