import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const authUser = createAsyncThunk(
    'users/authUser',
    async ({email, password}) => {
        const response = await fetch('/api/users/login/', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({email, password})
        })
        const data = await response.json()
        return data;
    }
);

const authUserSlice = createSlice({
    name: 'userInfo',
    initialState: { loading: false, userInfo: [], error: null},
    reducers: {
        logOut: (state) => {
            state.userInfo = []
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(authUser.pending, (state) => {
                state.loading = true;
                state.userInfo = [];
                state.error = null;
            })
            .addCase(authUser.fulfilled, (state, action) => {
                state.loading = false;
                state.userInfo = action.payload;
                state.error = null;
            })
            .addCase(authUser.rejected, (state, action) => {
                state.loading = false;
                state.userInfo = [];
                state.error = action.error.message
            })
    }
})

export const {logOut} = authUserSlice.actions;
export const authUserReducer = authUserSlice.reducer;