import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { createBrand, fetchBrands, updateBrand } from "../apis/brandAPI";


const initialState = {
    currBrand: null,
    brands: [],
    state: 'idle',
    responses: []
}

export const createBrandAsync = createAsyncThunk(
    'brand/createBrandAsync',
    async (name, { rejectWithValue }) => {
        try {
            const response = await createBrand(name)
            return response;
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)
export const updateBrandAsync = createAsyncThunk(
    'brand/updateBrandAsync',
    async ({ id, name }, { rejectWithValue }) => {
        try {
            const response = await updateBrand({ id, name })
            return response;
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)

export const fetchBrandsAsync = createAsyncThunk(
    'brand/fetchBrandsAsync',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetchBrands()
            return response;
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)



export const brandSlice = createSlice({
    name: "brand",
    initialState,
    reducers: {
        resetBrandResponses(state) {
            state.responses = [];
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBrandsAsync.pending, (state, action) => {
                state.state = "pending";
            })
            .addCase(fetchBrandsAsync.fulfilled, (state, action) => {
                state.state = "idle";
                state.brands = action.payload.data;
            })
            .addCase(fetchBrandsAsync.rejected, (state, action) => {
                state.state = "rejected";
                state.responses.push({ status: action.payload.status, message: action.payload.message });
            })
            .addCase(createBrandAsync.pending, (state, action) => {
                state.state = "pending";
            })
            .addCase(createBrandAsync.fulfilled, (state, action) => {
                state.state = "fulfilled";
                state.responses.push({ status: action.payload.status, message: action.payload.message });
            })
            .addCase(createBrandAsync.rejected, (state, action) => {
                state.state = "rejected";
                state.responses.push({ status: action.payload.status, message: action.payload.message });
            })
            .addCase(updateBrandAsync.pending, (state, action) => {
                state.state = "pending";
            })
            .addCase(updateBrandAsync.fulfilled, (state, action) => {
                state.state = "fulfilled";
                state.responses.push({ status: action.payload.status, message: action.payload.message });
            })
            .addCase(updateBrandAsync.rejected, (state, action) => {
                state.state = "rejected";
                state.responses.push({ status: action.payload.status, message: action.payload.message });
            })
    }

})

export default brandSlice.reducer;
export const { resetBrandResponses } = brandSlice.actions