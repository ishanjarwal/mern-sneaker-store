import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAllProducts } from "../apis/productAPI";

const initialState = {
    products: [],
    currProduct: null,
    totalItems: 0,
    state: 'idle'
}


export const fetchAllProductsAsync = createAsyncThunk(
    'products/fetchAllProducts',
    async (options) => {
        const response = await fetchAllProducts(options);
        return { data: response.data, totalItems: response.totalItems };
    }
)

export const productSlice = createSlice({
    name: 'product',
    initialState: initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllProductsAsync.pending, (state, action) => {
                state.state = 'pending';
            })
            .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
                state.state = 'fulfilled';
                state.totalItems = action.payload.totalItems;
                const visibleProducts = action.payload.data.map((product, index) => (
                    {
                        name: product.name,
                        price: product.sizes[0].price,
                        discountPercentage: product.sizes[0].discountPercentage,
                        images: product.images,
                        thumbnail: product.images[0],
                        brand: product.brand
                    }
                ))
                state.products = visibleProducts;
            })
            .addCase(fetchAllProductsAsync.rejected, (state, action) => {
                state.state = 'rejected';
            })
    }
})

export default productSlice.reducer