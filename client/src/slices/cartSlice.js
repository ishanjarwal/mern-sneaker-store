import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addToCart, deleteFromCart, fetchCart, updateCart } from "../apis/cartAPI";

const initialState = {
    items: [],
    state: 'idle',
    shown: false,
    apiError: null,
    apiMessage: null
}

export const fetchCartAsync = createAsyncThunk(
    'cart/fetchCartAsync',
    async (uid) => {
        const response = await fetchCart(uid);
        return response;
    }
)


export const addToCartAsync = createAsyncThunk(
    'cart/addToCartAsync',
    async ({ user_id, data }) => {
        const response = await addToCart({ user_id, data });
        return response;
    }
)

export const deleteFromCartAsync = createAsyncThunk(
    'cart/deleteFromCartAsync',
    async ({ user_id, product_id, size }) => {
        const response = await deleteFromCart({ user_id, product_id, size });
        return response;
    }
)

export const updateCartAsync = createAsyncThunk(
    'cart/updateCartAsync',
    async ({ user_id, data }) => {
        const response = await updateCart({ user_id, data });
        return response;
    }
)

export const cartSlice = createSlice({
    name: "cart",
    initialState: initialState,
    reducers: {
        showCart(state) {
            state.shown = true;
        },
        hideCart(state) {
            state.shown = false;
        },
        resetCartApiError(state) {
            state.apiError = null;
        },
        resetCartApiMessage(state) {
            state.apiMessage = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCartAsync.pending, (state, action) => {
                state.state = 'pending';
                state.apiError = null;
                state.apiMessage = null;
            })
            .addCase(fetchCartAsync.fulfilled, (state, action) => {
                state.items = action.payload;
                state.state = 'idle'
            })
            .addCase(fetchCartAsync.rejected, (state, action) => {
                state.state = 'rejected';
                state.apiError = action.error.message
            })
            .addCase(addToCartAsync.pending, (state, action) => {
                state.state = 'pending';
                state.apiError = null;
                state.apiMessage = null;
            })
            .addCase(addToCartAsync.fulfilled, (state, action) => {
                state.state = 'fulfilled'
                state.apiMessage = action.payload.apiSuccessMessage
            })
            .addCase(addToCartAsync.rejected, (state, action) => {
                state.state = 'rejected';
                state.apiError = action.error.message
            })
            .addCase(deleteFromCartAsync.pending, (state, action) => {
                state.state = 'pending';
                state.apiError = null;
                state.apiMessage = null;
            })
            .addCase(deleteFromCartAsync.fulfilled, (state, action) => {
                state.state = 'fulfilled'
                state.apiMessage = action.payload.apiSuccessMessage
            })
            .addCase(deleteFromCartAsync.rejected, (state, action) => {
                state.state = 'rejected';
                state.apiError = action.error.message
            })
            .addCase(updateCartAsync.pending, (state, action) => {
                state.state = 'pending';
                state.apiError = null;
                state.apiMessage = null;
            })
            .addCase(updateCartAsync.fulfilled, (state, action) => {
                state.state = 'fulfilled'
                state.apiMessage = action.payload.apiSuccessMessage
            })
            .addCase(updateCartAsync.rejected, (state, action) => {
                state.state = 'rejected';
                state.apiError = action.error.message
            })
    }
})

export const { showCart, hideCart, resetCartApiError, resetCartApiMessage } = cartSlice.actions;
export default cartSlice.reducer