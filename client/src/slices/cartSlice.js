import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addToCart, deleteFromCart, fetchCart, updateCart } from "../apis/cartAPI";

const initialState = {
    items: [],
    state: 'idle',
    shown: false,
    responses: []
}

export const fetchCartAsync = createAsyncThunk(
    'cart/fetchCartAsync',
    async (uid, { rejectWithValue }) => {
        try {
            const response = await fetchCart(uid);
            return response;
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)


export const addToCartAsync = createAsyncThunk(
    'cart/addToCartAsync',
    async ({ user_id, data }, { rejectWithValue }) => {
        try {
            const response = await addToCart({ user_id, data });
            return response;
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)

export const deleteFromCartAsync = createAsyncThunk(
    'cart/deleteFromCartAsync',
    async ({ user_id, product_id, size }, { rejectWithValue }) => {
        try {
            const response = await deleteFromCart({ user_id, product_id, size });
            return response;
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)

export const updateCartAsync = createAsyncThunk(
    'cart/updateCartAsync',
    async ({ user_id, data }, { rejectWithValue }) => {
        try {
            const response = await updateCart({ user_id, data });
            return response;
        } catch (err) {
            return rejectWithValue(err)
        }
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
        resetCartResponses(state) {
            state.responses = [];
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCartAsync.pending, (state, action) => {
                state.state = 'pending';
            })
            .addCase(fetchCartAsync.fulfilled, (state, action) => {
                state.state = 'idle'
                state.items = action.payload.data;
            })
            .addCase(fetchCartAsync.rejected, (state, action) => {
                state.state = 'rejected';
            })
            .addCase(addToCartAsync.pending, (state, action) => {
                state.state = 'pending';
            })
            .addCase(addToCartAsync.fulfilled, (state, action) => {
                state.state = 'fulfilled'
                state.responses.push({ status: action.payload.status, message: action.payload.message })
            })
            .addCase(addToCartAsync.rejected, (state, action) => {
                state.state = 'rejected';
                state.responses.push({ status: action.payload.status, message: action.payload.message })
            })
            .addCase(deleteFromCartAsync.pending, (state, action) => {
                state.state = 'pending';
            })
            .addCase(deleteFromCartAsync.fulfilled, (state, action) => {
                state.state = 'fulfilled'
                state.responses.push({ status: action.payload.status, message: action.payload.message })
            })
            .addCase(deleteFromCartAsync.rejected, (state, action) => {
                state.state = 'rejected';
                state.responses.push({ status: action.payload.status, message: action.payload.message })
            })
            .addCase(updateCartAsync.pending, (state, action) => {
                state.state = 'pending';
            })
            .addCase(updateCartAsync.fulfilled, (state, action) => {
                state.state = 'fulfilled'
                state.responses.push({ status: action.payload.status, message: action.payload.message })
            })
            .addCase(updateCartAsync.rejected, (state, action) => {
                state.state = 'rejected';
                state.responses.push({ status: action.payload.status, message: action.payload.message })
            })
    }
})

export const { showCart, hideCart, resetCartResponses } = cartSlice.actions;
export default cartSlice.reducer