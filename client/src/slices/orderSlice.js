import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { createOrder, fetchOrders, verifyPayment } from '../apis/orderAPI'

const initialState = {
    state: 'idle',
    currOrder: null,
    orderSuccess: false,
    orders: null,
    validationErrors: null,
    currRazorpayOrder: null,
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

export const verifyPaymentAsync = createAsyncThunk(
    'order/verifyPaymentAsync',
    async (data, { rejectWithValue }) => {
        try {
            const response = await verifyPayment(data);
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
        },
        resetCurrRazorpayOrder(state) {
            state.currRazorpayOrder = null;
        },
        resetOrderSuccess(state) {
            state.orderSuccess = null;
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
                // state.orderSuccess = true;
                state.validationErrors = null;
                if (action.payload?.data) {
                    state.currRazorpayOrder = action.payload.data;
                }
            })
            .addCase(createOrderAsync.rejected, (state, action) => {
                state.state = 'rejected';
                if (action.payload?.validationErrors) {
                    state.validationErrors = action.payload.validationErrors;
                } else {
                    state.responses.push({ status: action.payload.status, message: action.payload.message })
                }
            })
            .addCase(verifyPaymentAsync.pending, (state, action) => {
                state.state = 'pending';
                state.currRazorpayOrder = null;
            })
            .addCase(verifyPaymentAsync.fulfilled, (state, action) => {
                state.state = 'fulfilled';
                state.responses.push({ status: action.payload.status, message: action.payload.message })
                state.orderSuccess = 'success';
            })
            .addCase(verifyPaymentAsync.rejected, (state, action) => {
                state.state = 'rejected';
                state.orderSuccess = 'fail';
                state.responses.push({ status: action.payload.status, message: action.payload.message })
            })
    }
})

export const { resetOrderResponses, resetCurrRazorpayOrder, resetOrderSuccess } = orderSlice.actions;
export default orderSlice.reducer