import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { createCategory, fetchCategories, updateCategory } from "../apis/categoryAPI"


const initialState = {
    currCategory: null,
    categories: [],
    state: 'idle',
    responses: []
}

export const createCategoryAsync = createAsyncThunk(
    'category/createCategoryAsync',
    async (name, { rejectWithValue }) => {
        try {
            const response = await createCategory(name)
            return response;
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)
export const updateCategoryAsync = createAsyncThunk(
    'category/updateCategoryAsync',
    async ({ id, name }, { rejectWithValue }) => {
        try {
            const response = await updateCategory({ id, name })
            return response;
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)

export const fetchCategoriesAsync = createAsyncThunk(
    'category/fetchCategoriesAsync',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetchCategories()
            return response;
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)



export const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {
        resetCategoryResponses(state) {
            state.responses = [];
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategoriesAsync.pending, (state, action) => {
                state.state = "pending";
            })
            .addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
                state.state = "idle";
                state.categories = action.payload.data;
            })
            .addCase(fetchCategoriesAsync.rejected, (state, action) => {
                state.state = "rejected";
                state.responses.push({ status: action.payload.status, message: action.payload.message })
            })
            .addCase(createCategoryAsync.pending, (state, action) => {
                state.state = "pending";
            })
            .addCase(createCategoryAsync.fulfilled, (state, action) => {
                state.state = "fulfilled";
                state.responses.push({ status: action.payload.status, message: action.payload.message })
            })
            .addCase(createCategoryAsync.rejected, (state, action) => {
                state.state = "rejected";
                state.responses.push({ status: action.payload.status, message: action.payload.message })
            })
            .addCase(updateCategoryAsync.pending, (state, action) => {
                state.state = "pending";
            })
            .addCase(updateCategoryAsync.fulfilled, (state, action) => {
                state.state = "fulfilled";
                state.responses.push({ status: action.payload.status, message: action.payload.message })
            })
            .addCase(updateCategoryAsync.rejected, (state, action) => {
                state.state = "rejected";
                state.responses.push({ status: action.payload.status, message: action.payload.message })
            })
    }

})

export const { resetCategoryResponses } = categorySlice.actions
export default categorySlice.reducer;