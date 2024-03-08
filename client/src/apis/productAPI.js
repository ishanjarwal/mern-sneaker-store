import axios from 'axios'

export function fetchAllProducts({ filters, sort, pagination }) {
    return new Promise(async (resolve) => {
        let queryString = '';
        // pagination
        queryString += "_page=" + pagination.page + "&" + "_limit=" + pagination.limit + "&";
        queryString += "_sort=" + sort.sort_by + "&_order=" + sort.order_by
        const url = 'http://localhost:3000/products?' + queryString;
        const response = await axios.get(url);
        const data = response.data;
        resolve({ data: data, totalItems: response.headers['x-total-count'] })
    })
}