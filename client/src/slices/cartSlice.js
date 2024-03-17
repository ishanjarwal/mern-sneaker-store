import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchCart, updateCart } from "../apis/cartAPI";

const initialState = {
    items: [],
    state: 'idle'
}

export const fetchCartAsync = createAsyncThunk(
    'cart/fetchCartAsync',
    async (uid) => {
        const response = await fetchCart(uid);
        return response.data; // the sendable array
    }
)


export const updateCartAsync = createAsyncThunk(
    'cart/updateCartAsync',
    async ({ uid, data }) => {
        const response = await updateCart({ uid, data });
        return response.data;
    }
)


export const cartSlice = createSlice({
    name: "cart",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCartAsync.pending, (state, action) => {
                state.state = 'pending';
            })
            .addCase(fetchCartAsync.fulfilled, (state, action) => {
                state.items = action.payload;
            })
            .addCase(fetchCartAsync.rejected, (state, action) => {
                state.state = 'rejected';
            })
            .addCase(updateCartAsync.pending, (state, action) => {
                state.state = 'pending';
            })
            .addCase(updateCartAsync.fulfilled, (state, action) => {
                state.state = 'idle'
            })
            .addCase(updateCartAsync.rejected, (state, action) => {
                state.state = 'rejected';
            })
    }
})


export default cartSlice.reducer