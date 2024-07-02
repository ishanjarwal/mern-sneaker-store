import axios from "axios";
import { DOMAIN } from "../app/constants";

const url = `${DOMAIN}/api/category`;

export async function createCategory(name) {
    try {
        const response = await axios.post(url, { name })
        return response.data;
    } catch (error) {
        throw new Error(error.response.data);
    }
}

export async function updateCategory({ id, name }) {
    try {
        const response = await axios.patch(url, { id, name })
        return response.data;
    } catch (error) {
        throw new Error(error.response.data);
    }
}

export async function fetchCategories() {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data);
    }
}