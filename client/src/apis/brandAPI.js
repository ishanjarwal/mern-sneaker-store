import axios from "axios";
import { DOMAIN } from "../app/constants";

const url = `${DOMAIN}/api/brand`;

export async function createBrand(name) {
    try {
        const response = await axios.post(url, { name })
        return response.data;
    } catch (error) {
        throw new Error(error.response.data);
    }
}

export async function updateBrand({ id, name }) {
    try {
        const response = await axios.patch(url, { id, name })
        return response.data;
    } catch (error) {
        throw new Error(error.response.data);
    }
}

export async function fetchBrands() {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data);
    }
}