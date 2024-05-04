import axios from 'axios'

export async function fetchAllProducts() {
    try {
        const url = 'http://localhost:8080/api/product';
        const response = await axios.get(url);
        const data = response.data;
        return data;
    } catch (err) {
        throw err;
    }
}

export async function fetchProducts({ filters, sort, pagination }) {
    let queryString = '';
    // pagination
    queryString += "_page=" + pagination.page + "&" + "_limit=" + pagination.limit + "&";
    queryString += "_sort=" + sort.sort_by + "&_order=" + sort.order_by + "&";

    // filters 
    // todo : create a single string with comma seperated values for a single filter field
    for (let key in filters) {
        for (let value of filters[key]) {
            queryString += `${key}=${value}&`;
        }
    }
    // const url = 'http://localhost:3000/api/product?' + queryString;
    try {
        const url = 'http://localhost:8080/api/product';
        const response = await axios.get(url);
        const data = response.data.data;
        const totalProducts = response.data.totalProducts
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
        return { data: sendable, totalProducts: totalProducts };
    } catch (err) {
        throw err
    }

}

export async function fetchProductById({ product_id, size }) {
    try {
        const url = 'http://localhost:8080/api/product/' + product_id + "/" + size;
        const response = await axios.get(url);
        const result = response.data;
        return result
    } catch (err) {
        throw err;
    }
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
        url: 'http://localhost:8080/api/product',
        headers: {
            "Content-Type": "multipart/form-data"
        },
        data: newProduct
    };

    try {
        const response = await axios.request(config);
        return { created: true, err: null };
    } catch (err) {
        throw err;
    }
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
        method: 'patch',
        withCredentials: true,
        // maxBodyLength: 5242880,
        url: 'http://localhost:8080/api/product/' + id,
        headers: {
            "Content-Type": "multipart/form-data"
        },
        data: newProduct
    };

    try {
        const response = await axios.request(config);
        return { created: true, err: null };
    } catch (err) {
        throw err;
    }
}

export function fetchBrands() {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.get("http://localhost:8080/api/brand")
            resolve({ data: response.data })
        } catch (error) {
            reject({ err: error })
        }
    })
}

export function fetchCategories() {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.get("http://localhost:8080/api/category")
            resolve({ data: response.data })
        } catch (error) {
            reject({ err: error })
        }
    })
}
