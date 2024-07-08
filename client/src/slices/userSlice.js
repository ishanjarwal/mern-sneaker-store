import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { checkAuth, createUser, fetchUsers, loginUser, logoutUser, updateUser, updateUserAddress } from "../apis/userAPI";

const initialState = {
    currUser: null,
    users: null,
    user: null,
    state: 'idle',
    responses: []
}

export const createUserAsync = createAsyncThunk(
    'user/createUserAsync',
    async (data, { rejectWithValue }) => {
        try {
            const response = await createUser(data);
            return response
        } catch (err) {
            return rejectWithValue(err);
        }
    }
)
export const loginUserAsync = createAsyncThunk(
    'user/loginUserAsync',
    async (data, { rejectWithValue }) => {
        try {
            const response = await loginUser(data)
            return response;
        } catch (err) {
            return rejectWithValue(err);
        }
    }
)

export const logoutUserAsync = createAsyncThunk(
    'user/logoutUserAsync',
    async (_, { rejectWithValue }) => {
        try {
            const response = await logoutUser()
            return response;
        } catch (err) {
            console.log(err)
            return rejectWithValue(err)
        }
    }
)

export const checkAuthAsync = createAsyncThunk(
    'user/checkAuthAsync',
    async (_, { rejectWithValue }) => {
        try {
            const response = await checkAuth()
            return response;
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)

export const updateUserAddressAsync = createAsyncThunk(
    'user/updateUserAddressAsync',
    async ({ user_id, data }, { rejectWithValue }) => {
        try {
            const response = await updateUserAddress({ user_id, data })
            return response;
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)

export const updateUserAsync = createAsyncThunk(
    'user/updateUserAsync',
    async ({ user_id, data }, { rejectWithValue }) => {
        try {
            const response = await updateUser({ user_id, data })
            return response;
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)

export const fetchUsersAsync = createAsyncThunk(
    'user/fetchUsersAsync',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetchUsers()
            return response;
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)

export const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        setUser(state, action) {
            state.user = action.payload;
        },
        resetUser(state) {
            state.user = null;
        },
        resetUserResponses(state) {
            state.responses = [];
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createUserAsync.pending, (state, action) => {
                state.state = 'pending';
            })
            .addCase(createUserAsync.fulfilled, (state, action) => {
                state.state = 'fulfilled';
                state.currUser = action.payload.data;
                state.responses.push({ status: action.payload.status, message: action.payload.message })
            })
            .addCase(createUserAsync.rejected, (state, action) => {
                state.state = 'rejected';
                state.responses.push({ status: action.payload.status, message: action.payload.message })
            })
            .addCase(loginUserAsync.pending, (state, action) => {
                state.state = 'pending';
            })
            .addCase(loginUserAsync.fulfilled, (state, action) => {
                state.state = 'fulfilled';
                state.currUser = action.payload.data;
                state.responses.push({ status: action.payload.status, message: action.payload.message })
            })
            .addCase(loginUserAsync.rejected, (state, action) => {
                state.state = 'rejected';
                state.responses.push({ status: action.payload.status, message: action.payload.message })
            })
            .addCase(logoutUserAsync.pending, (state, action) => {
                state.state = 'pending';
            })
            .addCase(logoutUserAsync.fulfilled, (state, action) => {
                state.state = 'fulfilled';
                state.currUser = action.payload.data;
                state.responses.push({ status: action.payload.status, message: action.payload.message })
            })
            .addCase(logoutUserAsync.rejected, (state, action) => {
                state.state = 'rejected';
                state.responses.push({ status: action.payload.status, message: action.payload.message })
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
                state.responses.push({ status: action.payload.status, message: action.payload.message })
            })
            .addCase(updateUserAddressAsync.pending, (state, action) => {
                state.state = 'pending';
            })
            .addCase(updateUserAddressAsync.fulfilled, (state, action) => {
                state.state = 'fulfilled';
                state.responses.push({ status: action.payload.status, message: action.payload.message })
            })
            .addCase(updateUserAddressAsync.rejected, (state, action) => {
                state.state = 'rejected';
                state.responses.push({ status: action.payload.status, message: action.payload.message })
            })
            .addCase(updateUserAsync.pending, (state, action) => {
                state.state = 'pending';
            })
            .addCase(updateUserAsync.fulfilled, (state, action) => {
                state.state = 'fulfilled';
                state.responses.push({ status: action.payload.status, message: action.payload.message })
            })
            .addCase(updateUserAsync.rejected, (state, action) => {
                state.state = 'rejected';
                state.responses.push({ status: action.payload.status, message: action.payload.message })
            })
            .addCase(fetchUsersAsync.pending, (state, action) => {
                state.state = 'pending';
            })
            .addCase(fetchUsersAsync.fulfilled, (state, action) => {
                state.state = 'fulfilled';
                state.users = action.payload.data
            })
            .addCase(fetchUsersAsync.rejected, (state, action) => {
                state.state = 'rejected';
                state.responses.push({ status: action.payload.status, message: action.payload.message })
            })
    }
})

export const { setUser, resetUser, resetUserResponses } = userSlice.actions;

export default userSlice.reducer