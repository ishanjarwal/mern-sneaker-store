import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createProduct, fetchProducts, fetchBrands, fetchCategories, fetchProductById, updateProduct, fetchAllProducts, toggleDraft } from "../apis/productAPI";

const initialState = {
    products: [],
    currProduct: null,
    totalItems: 0,
    state: 'idle',
    responses: [],
    ITEMS_PER_PAGE: 0,
    validationErrors: null
}

// only for admin
export const fetchAllProductsAsync = createAsyncThunk(
    'products/fetchAllProductsAsync',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetchAllProducts();
            return response;
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)

export const toggleDraftAsync = createAsyncThunk(
    'products/toggleDraftAsync',
    async (product_id, { rejectWithValue }) => {
        try {
            const response = await toggleDraft(product_id);
            return response;
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)

// with filters
export const fetchProductsAsync = createAsyncThunk(
    'products/fetchProductsAsync',
    async (options, { rejectWithValue }) => {
        try {
            const response = await fetchProducts(options);
            return response;
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)

export const fetchProductByIdAsync = createAsyncThunk(
    'products/fetchProductByIdAsync',
    async ({ product_id, size }, { rejectWithValue }) => {
        try {
            const response = await fetchProductById({ product_id, size });
            return response;
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)

export const createProductAsync = createAsyncThunk(
    'products/createProductAsync',
    async (data, { rejectWithValue }) => {
        try {
            const response = await createProduct(data);
            return response;
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)

export const updateProductAsync = createAsyncThunk(
    'products/updateProductAsync',
    async ({ id, data }, { rejectWithValue }) => {
        try {
            const response = await updateProduct({ id, data });
            return response;
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)

export const productSlice = createSlice({
    name: 'product',
    initialState: initialState,
    reducers: {
        resetCurrProduct(state) {
            state.currProduct = null;
        },
        resetProductResponses(state) {
            state.responses = [];
        },
        resetValidationErrors(state) {
            state.validationErrors = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllProductsAsync.pending, (state, action) => {
                state.state = 'pending';
            })
            .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
                state.state = 'fulfilled';
                state.products = action.payload.data;
            })
            .addCase(fetchAllProductsAsync.rejected, (state, action) => {
                state.state = 'rejected';
                state.responses.push({ status: action.payload.status, message: action.payload.message })
            })
            .addCase(fetchProductsAsync.pending, (state, action) => {
                state.state = 'pending';
            })
            .addCase(fetchProductsAsync.fulfilled, (state, action) => {
                state.state = 'fulfilled';
                state.totalItems = action.payload.totalProducts;
                state.products = action.payload.data;
                state.ITEMS_PER_PAGE = action.payload.ITEMS_PER_PAGE;
            })
            .addCase(fetchProductsAsync.rejected, (state, action) => {
                state.state = 'rejected';
                state.responses.push({ status: action.payload.status, message: action.payload.message })
            })
            .addCase(fetchProductByIdAsync.pending, (state, action) => {
                state.state = 'pending';
            })
            .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
                state.state = 'fulfilled';
                state.currProduct = action.payload.data
            })
            .addCase(fetchProductByIdAsync.rejected, (state, action) => {
                state.state = 'rejected';
                if (action.payload?.validationErrors) {
                    for (let error of action.payload.validationErrors) {
                        state.responses.push({ status: 'error', message: error.msg })
                    }
                } else {
                    state.responses.push({ status: action.payload.status, message: action.payload.message })
                }
            })
            .addCase(createProductAsync.pending, (state, action) => {
                state.state = 'pending';
            })
            .addCase(createProductAsync.fulfilled, (state, action) => {
                state.state = 'fulfilled';
                state.responses.push({ status: action.payload.status, message: action.payload.message })
                state.validationErrors = null;
            })
            .addCase(createProductAsync.rejected, (state, action) => {
                state.state = 'rejected';
                if (action.payload?.validationErrors) {
                    state.validationErrors = action.payload.validationErrors;
                } else {
                    state.responses.push({ status: action.payload.status, message: action.payload.message })
                    state.validationErrors = null;
                }
            })
            .addCase(updateProductAsync.pending, (state, action) => {
                state.state = 'pending';
            })
            .addCase(updateProductAsync.fulfilled, (state, action) => {
                state.state = 'fulfilled';
                state.responses.push({ status: action.payload.status, message: action.payload.message })
            })
            .addCase(updateProductAsync.rejected, (state, action) => {
                state.state = 'rejected';
                state.responses.push({ status: action.payload.status, message: action.payload.message })
            })
            .addCase(toggleDraftAsync.pending, (state, action) => {
                state.state = 'pending';
            })
            .addCase(toggleDraftAsync.fulfilled, (state, action) => {
                state.state = 'fulfilled';
                state.responses.push({ status: action.payload.status, message: action.payload.message })
                state.validationErrors = null;
            })
            .addCase(toggleDraftAsync.rejected, (state, action) => {
                state.state = 'rejected';
                if (action.payload?.validationErrors) {
                    state.validationErrors = action.payload.validationErrors;
                } else {
                    state.responses.push({ status: action.payload.status, message: action.payload.message })
                    state.validationErrors = null;
                }
            })
    }
})

export default productSlice.reducer
export const { resetCurrProduct, resetProductResponses, resetValidationErrors } = productSlice.actions;