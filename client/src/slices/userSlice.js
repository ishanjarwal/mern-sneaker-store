import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { checkAuth, createUser, loginUser, updateUser, updateUserAddress } from "../apis/userAPI";

const initialState = {
    currUser: null,
    users: null,
    state: 'idle',
    apiError: null,
    apiMessage: null
}

export const createUserAsync = createAsyncThunk(
    'user/createUserAsync',
    async (data) => {
        const response = await createUser(data);
        return response
    }
)
export const loginUserAsync = createAsyncThunk(
    'user/loginUserAsync',
    async (data) => {
        const response = await loginUser(data)
        return response;
    }
)

export const checkAuthAsync = createAsyncThunk(
    'user/checkAuthAsync',
    async () => {
        const response = await checkAuth()
        return response;
    }
)

export const updateUserAddressAsync = createAsyncThunk(
    'user/updateUserAddressAsync',
    async ({ user_id, data }) => {
        const response = await updateUserAddress({ user_id, data })
        return response;
    }
)

export const updateUserAsync = createAsyncThunk(
    'user/updateUserAsync',
    async ({ user_id, data }) => {
        const response = await updateUser({ user_id, data })
        return response;
    }
)

export const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        resetUserApiError(state) {
            state.apiError = null;
        },
        resetUserApiMessage(state) {
            state.apiMessage = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createUserAsync.pending, (state, action) => {
                state.state = 'pending';
            })
            .addCase(createUserAsync.fulfilled, (state, action) => {
                state.state = 'fulfilled';
                state.currUser = action.payload.user;
            })
            .addCase(createUserAsync.rejected, (state, action) => {
                state.state = 'rejected';
                state.apiError = action.error.message
            })
            .addCase(loginUserAsync.pending, (state, action) => {
                state.state = 'pending';
            })
            .addCase(loginUserAsync.fulfilled, (state, action) => {
                state.state = 'fulfilled';
                state.currUser = action.payload.data;
            })
            .addCase(loginUserAsync.rejected, (state, action) => {
                state.state = 'rejected';
                state.apiError = action.error.message
            })
            .addCase(checkAuthAsync.pending, (state, action) => {
                state.state = 'pending';
            })
            .addCase(checkAuthAsync.fulfilled, (state, action) => {
                state.state = 'idle';
                state.currUser = action.payload.data;
            })
            .addCase(checkAuthAsync.rejected, (state, action) => {
                state.state = 'rejected';
                state.apiError = action.error.message
            })
            .addCase(updateUserAddressAsync.pending, (state, action) => {
                state.state = 'pending';
            })
            .addCase(updateUserAddressAsync.fulfilled, (state, action) => {
                state.state = 'fulfilled';
                state.apiMessage = action.payload.apiSuccessMessage;
            })
            .addCase(updateUserAddressAsync.rejected, (state, action) => {
                state.state = 'rejected';
                state.apiError = action.error.message
            })
            .addCase(updateUserAsync.pending, (state, action) => {
                state.state = 'pending';
            })
            .addCase(updateUserAsync.fulfilled, (state, action) => {
                state.state = 'fulfilled';
                state.apiMessage = action.payload.apiSuccessMessage;
            })
            .addCase(updateUserAsync.rejected, (state, action) => {
                state.state = 'rejected';
                state.apiError = action.error.message
            })
    }
})

export const { resetUserApiError, resetUserApiMessage } = userSlice.actions;

export default userSlice.reducer