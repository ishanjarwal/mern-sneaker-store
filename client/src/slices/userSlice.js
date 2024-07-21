import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { checkAuth, createUser, deleteUserAddress, fetchUsers, loginUser, logoutUser, resetPassword, setPasswordResetToken, updateUser, updateUserAddress } from "../apis/userAPI";

const initialState = {
    currUser: null,
    users: null,
    user: null,
    state: 'idle',
    currAddress: null,
    responses: [],
    userValidationErrors: null,
    addressValidationErrors: null
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

export const deleteUserAddressAsync = createAsyncThunk(
    'user/deleteUserAddressAsync',
    async (id, { rejectWithValue }) => {
        try {
            const response = await deleteUserAddress(id)
            return response;
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)

export const updateUserAddressAsync = createAsyncThunk(
    'user/updateUserAddressAsync',
    async (data, { rejectWithValue }) => {
        try {
            const response = await updateUserAddress(data)
            return response;
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)

export const updateUserAsync = createAsyncThunk(
    'user/updateUserAsync',
    async (data, { rejectWithValue }) => {
        try {
            const response = await updateUser(data)
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

export const setPasswordResetTokenAsync = createAsyncThunk(
    'user/setPasswordResetTokenAsync',
    async (_, { rejectWithValue }) => {
        try {
            const response = await setPasswordResetToken();
            return response;
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)
export const resetPasswordAsync = createAsyncThunk(
    'user/resetPasswordAsync',
    async ({ password, token }, { rejectWithValue }) => {
        try {
            const response = await resetPassword({ password, token });
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
        },
        resetUserValidationErrors(state) {
            state.userValidationErrors = null;
        },
        resetAddressValidationErrors(state) {
            state.addressValidationErrors = null;
        },
        setCurrAddress(state, action) {
            state.currAddress = action.payload;
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
                state.userValidationErrors = null;
            })
            .addCase(createUserAsync.rejected, (state, action) => {
                state.state = 'rejected';
                if (action.payload?.validationErrors) {
                    state.userValidationErrors = action.payload.validationErrors;
                } else {
                    state.responses.push({ status: action.payload.status, message: action.payload.message })
                    state.userValidationErrors = null;
                }
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
            .addCase(deleteUserAddressAsync.pending, (state, action) => {
                state.state = 'pending';
            })
            .addCase(deleteUserAddressAsync.fulfilled, (state, action) => {
                state.state = 'fulfilled';
                state.responses.push({ status: action.payload.status, message: action.payload.message })
            })
            .addCase(deleteUserAddressAsync.rejected, (state, action) => {
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
                if (action.payload.validationErrors) {
                    state.addressValidationErrors = action.payload.validationErrors;
                } else {
                    state.responses.push({ status: action.payload.status, message: action.payload.message })
                    state.addressValidationErrors = null;
                }
            })
            .addCase(updateUserAsync.pending, (state, action) => {
                state.state = 'pending';
            })
            .addCase(updateUserAsync.fulfilled, (state, action) => {
                state.state = 'fulfilled';
                state.responses.push({ status: action.payload.status, message: action.payload.message })
                state.userValidationErrors = null;
            })
            .addCase(updateUserAsync.rejected, (state, action) => {
                state.state = 'rejected';
                if (action.payload?.validationErrors) {
                    state.userValidationErrors = action.payload.validationErrors;
                } else {
                    state.responses.push({ status: action.payload.status, message: action.payload.message })
                    state.userValidationErrors = null;
                }
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
            .addCase(setPasswordResetTokenAsync.pending, (state, action) => {
                state.state = 'pending';
            })
            .addCase(setPasswordResetTokenAsync.fulfilled, (state, action) => {
                state.state = 'fulfilled';
                state.responses.push({ status: action.payload.status, message: action.payload.message })
            })
            .addCase(setPasswordResetTokenAsync.rejected, (state, action) => {
                state.state = 'rejected';
                state.responses.push({ status: action.payload.status, message: action.payload.message })
            })
            .addCase(resetPasswordAsync.pending, (state, action) => {
                state.state = 'pending';
            })
            .addCase(resetPasswordAsync.fulfilled, (state, action) => {
                state.state = 'fulfilled';
                state.responses.push({ status: action.payload.status, message: action.payload.message })
            })
            .addCase(resetPasswordAsync.rejected, (state, action) => {
                state.state = 'rejected';
                state.responses.push({ status: action.payload.status, message: action.payload.message })
            })
    }
})

export const { setUser, resetUser, resetUserResponses, setCurrAddress, resetAddressValidationErrors, resetUserValidationErrors } = userSlice.actions;

export default userSlice.reducer