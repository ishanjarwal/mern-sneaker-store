import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAllProducts, fetchProductById } from "../apis/productAPI";

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

export const fetchProductByIdAsync = createAsyncThunk(
    'products/fetchProductByIdAsync',
    async (id) => {
        const response = await fetchProductById(id);
        return response.data;
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
                state.products = action.payload.data;
            })
            .addCase(fetchAllProductsAsync.rejected, (state, action) => {
                state.state = 'rejected';
            })
            .addCase(fetchProductByIdAsync.pending, (state, action) => {
                state.state = 'pending';
            })
            .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
                state.state = 'fulfilled';
                state.currProduct = action.payload
            })
            .addCase(fetchProductByIdAsync.rejected, (state, action) => {
                state.state = 'rejected';
            })
    }
})

export default productSlice.reducer