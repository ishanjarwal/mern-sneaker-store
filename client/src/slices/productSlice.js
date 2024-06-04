import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createProduct, fetchProducts, fetchBrands, fetchCategories, fetchProductById, updateProduct, fetchAllProducts } from "../apis/productAPI";

const initialState = {
    products: [],
    currProduct: null,
    totalItems: 0,
    state: 'idle',
    apiError: null,
    apiMessage: null
}

// only for admin
export const fetchAllProductsAsync = createAsyncThunk(
    'products/fetchAllProductsAsync',
    async () => {
        const response = await fetchAllProducts();
        return response
    }
)

// with filters
export const fetchProductsAsync = createAsyncThunk(
    'products/fetchProductsAsync',
    async (options) => {
        const response = await fetchProducts(options);
        return response
    }
)

export const fetchProductByIdAsync = createAsyncThunk(
    'products/fetchProductByIdAsync',
    async ({ product_id, size }) => {
        const response = await fetchProductById({ product_id, size });
        return response;
    }
)

export const fetchBrandsAsync = createAsyncThunk(
    'products/fetchBrandsAsync',
    async () => {
        const response = await fetchBrands();
        return response.data;
    }
)

export const fetchCategoriesAsync = createAsyncThunk(
    'products/fetchCategoriesAsync',
    async () => {
        const response = await fetchCategories();
        return response.data;
    }
)

export const createProductAsync = createAsyncThunk(
    'products/createProductAsync',
    async (data) => {
        const response = await createProduct(data);
        return response;
    }
)

export const updateProducyAsync = createAsyncThunk(
    'products/updateProductAsync',
    async ({ id, data }) => {
        const response = await updateProduct({ id, data });
        return response;
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
                state.products = action.payload.data;
            })
            .addCase(fetchAllProductsAsync.rejected, (state, action) => {
                state.state = 'rejected';
            })
            .addCase(fetchProductsAsync.pending, (state, action) => {
                state.state = 'pending';
            })
            .addCase(fetchProductsAsync.fulfilled, (state, action) => {
                state.state = 'fulfilled';
                state.totalItems = action.payload.totalProducts;
                state.products = action.payload.data;
            })
            .addCase(fetchProductsAsync.rejected, (state, action) => {
                state.state = 'rejected';
                state.apiError = action.error.message
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
            .addCase(createProductAsync.pending, (state, action) => {
                state.state = 'pending';
            })
            .addCase(createProductAsync.fulfilled, (state, action) => {
                state.state = 'fulfilled';
                state.apiMessage = "Product Added Successfully"
            })
            .addCase(createProductAsync.rejected, (state, action) => {
                state.state = 'rejected';
                state.apiError = action.error.message
            })
            .addCase(updateProducyAsync.pending, (state, action) => {
                state.state = 'pending';
            })
            .addCase(updateProducyAsync.fulfilled, (state, action) => {
                state.state = 'fulfilled';
                state.apiMessage = "Product Added Successfully"
            })
            .addCase(updateProducyAsync.rejected, (state, action) => {
                state.state = 'rejected';
                state.apiError = action.error.message
            })
    }
})

export default productSlice.reducer