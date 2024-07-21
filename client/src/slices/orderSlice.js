import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { createOrder, fetchOrders } from '../apis/orderAPI'

const initialState = {
    state: 'idle',
    currOrder: null,
    orders: null,
    validationErrors: null,
    responses: []
}

export const createOrderAsync = createAsyncThunk(
    'order/createOrderAsync',
    async (data, { rejectWithValue }) => {
        try {
            const response = await createOrder(data);
            return response;
        } catch (err) {
            return rejectWithValue(err);
        }
    }
)

export const fetchOrdersAsync = createAsyncThunk(
    'order/fetchOrdersAsync',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetchOrders();
            return response;
        } catch (err) {
            return rejectWithValue(err);
        }
    }
)

const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        resetValidationErrors(state) {
            state.validationErrors = null;
        },
        resetOrderResponses(state) {
            state.responses = [];
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrdersAsync.pending, (state, action) => {
                state.state = 'pending';
            })
            .addCase(fetchOrdersAsync.fulfilled, (state, action) => {
                state.state = 'idle';
                state.orders = action.payload.data
            })
            .addCase(fetchOrdersAsync.rejected, (state, action) => {
                state.state = 'rejected';
                state.responses.push({ status: action.payload.status, message: action.payload.message })
            })
            .addCase(createOrderAsync.pending, (state, action) => {
                state.state = 'pending';
            })
            .addCase(createOrderAsync.fulfilled, (state, action) => {
                state.state = 'fulfilled';
                state.responses.push({ status: action.payload.status, message: action.payload.message })
                state.validationErrors = null;
            })
            .addCase(createOrderAsync.rejected, (state, action) => {
                state.state = 'rejected';
                if (action.payload?.validationErrors) {
                    state.validationErrors = action.payload.validationErrors;
                } else {
                    state.responses.push({ status: action.payload.status, message: action.payload.message })
                }
            })
    }
})

export const { resetOrderResponses } = orderSlice.actions;
export default orderSlice.reducer