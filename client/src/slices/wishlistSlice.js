import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addToWishlist, deleteFromWishlist, fetchWishlist } from "../apis/wishlishtAPI";

const initialState = {
    items: [],
    state: 'idle',
    shown: false,
    responses: []
}

export const fetchWishlistAsync = createAsyncThunk(
    'wishlist/fetchWishlistAsync',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetchWishlist();
            return response;
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)

export const addToWishlistAsync = createAsyncThunk(
    'wishlist/addToWishlistAsync',
    async (product_id, { rejectWithValue }) => {
        try {
            const response = await addToWishlist(product_id);
            return response;
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)

export const deleteFromWishlistAsync = createAsyncThunk(
    'wishlist/deleteFromWishlistAsync',
    async (product_id, { rejectWithValue }) => {
        try {
            const response = await deleteFromWishlist(product_id);
            return response;
        } catch (err) {
            return rejectWithValue(err)
        }
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
        resetWishlistResponses(state) {
            state.responses = [];
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchWishlistAsync.pending, (state, action) => {
                state.state = 'pending';
            })
            .addCase(fetchWishlistAsync.fulfilled, (state, action) => {
                state.state = 'idle'
                state.items = action.payload.data;
            })
            .addCase(fetchWishlistAsync.rejected, (state, action) => {
                state.state = 'rejected';
                state.responses.push({ status: action.payload.status, message: action.payload.message });
            })
            .addCase(addToWishlistAsync.pending, (state, action) => {
                state.state = 'pending';
            })
            .addCase(addToWishlistAsync.fulfilled, (state, action) => {
                state.state = 'fulfilled'
                state.responses.push({ status: action.payload.status, message: action.payload.message });
            })
            .addCase(addToWishlistAsync.rejected, (state, action) => {
                state.state = 'rejected';
                state.responses.push({ status: action.payload.status, message: action.payload.message });
            })
            .addCase(deleteFromWishlistAsync.pending, (state, action) => {
                state.state = 'pending';
            })
            .addCase(deleteFromWishlistAsync.fulfilled, (state, action) => {
                state.state = 'fulfilled'
                state.responses.push({ status: action.payload.status, message: action.payload.message });
            })
            .addCase(deleteFromWishlistAsync.rejected, (state, action) => {
                state.state = 'rejected';
                state.responses.push({ status: action.payload.status, message: action.payload.message });
            })
    }
})

export const { showWishlist, hideWishlist, resetWishlistResponses } = wishlistSlice.actions;

export default wishlistSlice.reducer