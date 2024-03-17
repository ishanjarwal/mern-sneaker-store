import axios from 'axios'

export function fetchAllProducts({ filters, sort, pagination }) {
    return new Promise(async (resolve) => {
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
        const url = 'http://localhost:3000/products?' + queryString;
        const response = await axios.get(url);
        const data = response.data;
        const sendable = data.map((product, index) => (
            {
                id: product.id,
                name: product.name,
                brand: product.brand,
                category: product.category,
                mrp: product.sizes[0].price,
                sp: Math.floor(product.sizes[0].price * (1 - (product.sizes[0].discountPercentage / 100))),
                discountPercentage: product.sizes[0].discountPercentage,
                images: product.images,
                thumbnail: product.images[0]
            }
        ))
        resolve({ data: sendable, totalItems: response.headers['x-total-count'] })
    })
}

export function fetchProductById(id) {
    return new Promise(async (resolve) => {
        const url = 'http://localhost:3000/products/' + id;
        const response = await axios.get(url);
        const product = response.data;
        const sendable = {
            id: product.id,
            name: product.name,
            brand: product.brand,
            category: product.category,
            images: product.images,
            thumbnail: product.images[0],
            sizes: product.sizes.map((size) => ({
                size: size.size,
                stock: size.stock,
                mrp: size.price,
                sp: Math.floor(size.price * (1 - (size.discountPercentage / 100))),
                discountPercentage: size.discountPercentage
            })),
            additional_details: { ...product.additional_details, description: product.additional_details.description.split("\n") }
        }
        resolve({ data: sendable });
    }
    )
}