import axios from 'axios'
import { DOMAIN } from '../app/constants';

export async function fetchAllProducts() {
    return new Promise(async (resolve, reject) => {
        try {
            const url = DOMAIN + '/api/product/admin';
            const response = await axios.get(url, { withCredentials: true });
            resolve(response.data)
        } catch (err) {
            reject(err.response.data);
        }
    })
}

export async function fetchProducts({ filters, sort, pagination }) {
    return new Promise(async (resolve, reject) => {
        try {
            let queryString = '';

            // pagination
            queryString += "page=" + pagination.page + "&" + "limit=" + pagination.limit + "&";
            queryString += "sort=" + sort.sort_by + "&order=" + sort.order_by + "&";

            // filters 
            for (let key in filters) {
                for (let value of filters[key]) {
                    queryString += `${key}=${value}&`;
                }
            }
            const url = DOMAIN + '/api/product?' + queryString;
            const response = await axios.get(url);
            const data = response.data.data;
            const totalProducts = response.data.totalProducts
            const ITEMS_PER_PAGE = response.data.ITEMS_PER_PAGE || 1;
            const sendable = data.map((product, index) => (
                {
                    id: product._id,
                    name: product.name,
                    brand: product.brand.name,
                    category: product.category.name,
                    mrp: product.sizes[0].price,
                    sp: Math.floor(product.sizes[0].price * (1 - (product.sizes[0].discountPercentage / 100))),
                    discountPercentage: product.sizes[0].discountPercentage,
                    images: product.images,
                    thumbnail: product.images[0]
                }
            ))
            resolve({ data: sendable, totalProducts: totalProducts, ITEMS_PER_PAGE: ITEMS_PER_PAGE });
        } catch (err) {
            reject(err.response.data)
        }
    })
}

export async function fetchProductById({ product_id, size }) {
    return new Promise(async (resolve, reject) => {
        try {
            const url = DOMAIN + '/api/product/' + product_id + "/" + size;
            const response = await axios.get(url);
            resolve(response.data)
        } catch (err) {
            reject(err.response.data);
        }
    })
}


export async function createProduct(data) {
    const newProduct = new FormData();
    newProduct.append('name', data.name)
    newProduct.append('short_desc', data.short_desc)
    newProduct.append('description', data.description)
    newProduct.append('sizes', JSON.stringify(data.sizes))
    newProduct.append('category', JSON.stringify(data.category))
    newProduct.append('brand', JSON.stringify(data.brand))
    newProduct.append('dimensions', JSON.stringify(data.dimensions))
    for (let i = 0; i < data.images.length; i++) {
        newProduct.append('images', data.images[i]);
    }
    newProduct.append('shoe_materials', data.shoe_materials)
    newProduct.append('sole_materials', data.sole_materials)
    newProduct.append('occasion', data.occasion)
    newProduct.append('gender', data.gender)
    newProduct.append('tags', JSON.stringify(data.tags))
    newProduct.append('color', JSON.stringify(data.color))
    newProduct.append('weight', JSON.stringify(data.weight))
    newProduct.append('meta_info', JSON.stringify(data.meta_info))

    let config = {
        method: 'post',
        withCredentials: true,
        // maxBodyLength: 5242880,
        url: DOMAIN + '/api/product',
        headers: {
            "Content-Type": "multipart/form-data"
        },
        data: newProduct
    };
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.request(config);
            resolve(response.data)
        } catch (err) {
            if (err.response.data?.validationErrors) {
                const validationErrors = {};
                err.response.data.validationErrors.forEach(item => {
                    validationErrors[item.path] = item.msg;
                })
                reject({ validationErrors })
            }
            reject(err.response.data);
        }
    })
}

export async function updateProduct({ id, data }) {
    const newProduct = new FormData();
    newProduct.append('name', data.name)
    newProduct.append('short_desc', data.short_desc)
    newProduct.append('description', data.description)
    newProduct.append('sizes', JSON.stringify(data.sizes))
    newProduct.append('category', JSON.stringify(data.category))
    newProduct.append('brand', JSON.stringify(data.brand))
    newProduct.append('dimensions', JSON.stringify(data.dimensions))
    newProduct.append('old_images', JSON.stringify(data.images.filter(item => typeof item === 'string')));
    data.images.filter(item => typeof item != 'string').forEach(element => {
        newProduct.append("images", element)
    });
    newProduct.append('shoe_materials', data.shoe_materials)
    newProduct.append('sole_materials', data.sole_materials)
    newProduct.append('occasion', data.occasion)
    newProduct.append('gender', data.gender)
    newProduct.append('tags', JSON.stringify(data.tags))
    newProduct.append('color', JSON.stringify(data.color))
    newProduct.append('weight', JSON.stringify(data.weight))
    newProduct.append('meta_info', JSON.stringify(data.meta_info))

    let config = {
        method: 'patch',
        withCredentials: true,
        // maxBodyLength: 5242880,
        url: DOMAIN + '/api/product/' + id,
        headers: {
            "Content-Type": "multipart/form-data"
        },
        data: newProduct
    };

    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.request(config);
            resolve(response.data)
        } catch (err) {
            reject(err.response.data);
        }
    })
}

export function fetchBrands() {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.get(DOMAIN + "/api/brand")
            resolve(response.data)
        } catch (err) {
            reject(err.response.data)
        }
    })
}

export function fetchCategories() {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.get(DOMAIN + "/api/category")
            resolve(response.data)
        } catch (err) {
            reject(err.response.data)
        }
    })
}


export function toggleDraft(product_id) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.patch(DOMAIN + "/api/product/toggle-draft/" + product_id, {}, { withCredentials: true })
            resolve(response.data)
        } catch (err) {
            reject(err.response.data)
        }
    })
}
