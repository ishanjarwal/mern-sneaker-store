import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { createBrand, fetchBrands, updateBrand } from "../apis/brandAPI";


const initialState = {
    currBrand: null,
    brands: [],
    state: 'idle',
}

export const createBrandAsync = createAsyncThunk(
    'brand/createBrandAsync',
    async (name) => {
        const response = await createBrand(name)
        return response.data;
    }
)
export const updateBrandAsync = createAsyncThunk(
    'brand/updateBrandAsync',
    async ({ id, name }) => {
        const response = await updateBrand({ id, name })
        return response.data;
    }
)

export const fetchBrandsAsync = createAsyncThunk(
    'brand/fetchBrandsAsync',
    async () => {
        const response = await fetchBrands()
        return response.data;
    }
)



export const brandSlice = createSlice({
    name: "brand",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBrandsAsync.pending, (state, action) => {
                state.state = "pending";
            })
            .addCase(fetchBrandsAsync.fulfilled, (state, action) => {
                state.state = "idle";
                state.brands = action.payload;
            })
            .addCase(fetchBrandsAsync.rejected, (state, action) => {
                state.state = "rejected";
            })
            .addCase(createBrandAsync.pending, (state, action) => {
                state.state = "pending";
            })
            .addCase(createBrandAsync.fulfilled, (state, action) => {
                state.state = "fulfilled";
            })
            .addCase(createBrandAsync.rejected, (state, action) => {
                state.state = "rejected";
            })
            .addCase(updateBrandAsync.pending, (state, action) => {
                state.state = "pending";
            })
            .addCase(updateBrandAsync.fulfilled, (state, action) => {
                state.state = "fulfilled";
            })
            .addCase(updateBrandAsync.rejected, (state, action) => {
                state.state = "rejected";
            })
    }

})

export default brandSlice.reducer;