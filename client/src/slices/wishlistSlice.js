import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addToWishlist, deleteFromWishlist, fetchWishlist } from "../apis/wishlishtAPI";

const initialState = {
    items: [],
    state: 'idle',
    shown: false,
    apiError: null,
    apiMessage: null
}

export const fetchWishlistAsync = createAsyncThunk(
    'wishlist/fetchWishlistAsync',
    async (user_id) => {
        const response = await fetchWishlist(user_id);
        return response;
    }
)

export const addToWishlistAsync = createAsyncThunk(
    'wishlist/addToWishlistAsync',
    async ({ user_id, product_id }) => {
        const response = await addToWishlist({ user_id, product_id });
        return response;
    }
)

export const deleteFromWishlistAsync = createAsyncThunk(
    'wishlist/deleteFromWishlistAsync',
    async ({ user_id, product_id }) => {
        const response = await deleteFromWishlist({ user_id, product_id });
        return response;
    }
)


export const wishlistSlice = createSlice({
    name: "wishlist",
    initialState: initialState,
    reducers: {
        showWishlist(state) {
            state.shown = true;
        },
        hideWishlist(state) {
            state.shown = false;
        },
        resetWishlistApiError(state) {
            state.apiError = null;
        },
        resetWishlistApiMessage(state) {
            state.apiMessage = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchWishlistAsync.pending, (state, action) => {
                state.state = 'pending';
                state.apiError = null;
                state.apiMessage = null;
            })
            .addCase(fetchWishlistAsync.fulfilled, (state, action) => {
                state.state = 'idle'
                state.items = action.payload;
            })
            .addCase(fetchWishlistAsync.rejected, (state, action) => {
                state.state = 'rejected';
                state.apiError = action.error.message
            })
            .addCase(addToWishlistAsync.pending, (state, action) => {
                state.state = 'pending';
                state.apiError = null;
                state.apiMessage = null;
            })
            .addCase(addToWishlistAsync.fulfilled, (state, action) => {
                state.apiMessage = action.payload.apiSuccessMessage
                state.state = 'fulfilled'
            })
            .addCase(addToWishlistAsync.rejected, (state, action) => {
                state.state = 'rejected';
                state.apiError = action.error.message
            })
            .addCase(deleteFromWishlistAsync.pending, (state, action) => {
                state.state = 'pending';
                state.apiError = null;
                state.apiMessage = null;
            })
            .addCase(deleteFromWishlistAsync.fulfilled, (state, action) => {
                state.apiMessage = action.payload.apiSuccessMessage
                state.state = 'fulfilled'
            })
            .addCase(deleteFromWishlistAsync.rejected, (state, action) => {
                state.state = 'rejected';
                state.apiError = action.error.message
            })
    }
})

export const { showWishlist, hideWishlist, resetWishlistApiError, resetWishlistApiMessage } = wishlistSlice.actions;

export default wishlistSlice.reducer