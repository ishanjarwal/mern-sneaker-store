import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { createCategory, fetchCategories, updateCategory } from "../apis/categoryAPI"


const initialState = {
    currCategory: null,
    categories: [],
    state: 'idle',
}

export const createCategoryAsync = createAsyncThunk(
    'category/createCategoryAsync',
    async (name) => {
        const response = await createCategory(name)
        return response.data;
    }
)
export const updateCategoryAsync = createAsyncThunk(
    'category/updateCategoryAsync',
    async ({ id, name }) => {
        const response = await updateCategory({ id, name })
        return response.data;
    }
)

export const fetchCategoriesAsync = createAsyncThunk(
    'category/fetchCategoriesAsync',
    async () => {
        const response = await fetchCategories()
        return response.data;
    }
)



export const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategoriesAsync.pending, (state, action) => {
                state.state = "pending";
            })
            .addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
                state.state = "idle";
                state.categories = action.payload;
            })
            .addCase(fetchCategoriesAsync.rejected, (state, action) => {
                state.state = "rejected";
            })
            .addCase(createCategoryAsync.pending, (state, action) => {
                state.state = "pending";
            })
            .addCase(createCategoryAsync.fulfilled, (state, action) => {
                state.state = "fulfilled";
            })
            .addCase(createCategoryAsync.rejected, (state, action) => {
                state.state = "rejected";
            })
            .addCase(updateCategoryAsync.pending, (state, action) => {
                state.state = "pending";
            })
            .addCase(updateCategoryAsync.fulfilled, (state, action) => {
                state.state = "fulfilled";
            })
            .addCase(updateCategoryAsync.rejected, (state, action) => {
                state.state = "rejected";
            })
    }

})

export default categorySlice.reducer;