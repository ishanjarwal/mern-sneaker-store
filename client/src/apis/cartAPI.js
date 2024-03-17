import axios from 'axios'

export function fetchCart(uid) {
    return new Promise(async (resolve) => {

        // todo: right now, cart is fetched from uid mapping to cart id, fix it
        // mock cart : 
        // {
        //     "id": 1,
        //     "uid": 1,
        //      "items": [
        //                 {
        //                     "pid": 1,
        //                     "qty": 1,
        //                     "size": "7"
        //                 },
        //                 {
        //                     "pid": 4,
        //                     "qty": 3,
        //                     "size": "8"
        //                 },
        //                 {
        //                     "pid": 8,
        //                     "qty": 2,
        //                     "size": "9"
        //                 }
        //             ]
        // }
        const url = 'http://localhost:3000/cart/' + uid
        const response = await axios.get(url);
        const data = response.data;
        if (data.items.length > 0) {
            const pIds = data.items.map((product) => (
                product.pid
            ))
            let queryString = ""
            for (let id of pIds) {
                queryString += "id=" + id + "&"
            }
            const result = await axios.get('http://localhost:3000/products?' + queryString)
            // result.data is the array of actual products, we need to add qty and size to them
            const sendable = result.data.map((product, index) => {
                const discountPercentage = product.sizes
                    .find((size) => (
                        size.size === data.items.find(el => el.pid === product.id).size
                    )).discountPercentage;
                const sp = Math.floor(
                    product.mrp * (1 - discountPercentage / 100)
                )
                return (
                    {
                        product: product,
                        sp: sp,
                        qty: data.items.find(el => el.pid === product.id).qty,
                        size: data.items.find(el => el.pid === product.id).size,
                    }
                )
            })
            resolve({ data: sendable })
        }
        resolve({ data: [] })
    })
}

export function updateCart({ uid, data }) {
    return new Promise(async (resolve) => {
        const url = 'http://localhost:3000/cart/' + uid
        const sendable = {
            items: data
        }
        const response = await axios.patch(url, sendable);
        resolve({ data: response.data })
    })
}

export function addToCart(data) {
    return new Promise(async (resolve) => {
        const sendable = {
            uid: data.uid,
            items: [{ pid: data.items.pid, qty: data.items.qty, size: data.items.size }]
        }
        const response = await axios.post('http://localhost:3000/cart', sendable)

    })
}