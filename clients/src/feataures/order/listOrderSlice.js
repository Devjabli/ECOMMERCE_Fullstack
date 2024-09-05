import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const myOrderList = createAsyncThunk(
    'order/myOrdersList',
    async (_, {getState}) => {
        const state = getState();
        const token = state.authUser.userInfo.token
        const response = await fetch('/api/orders/myorders/', {
            method: 'GET',
            headers: {
                'Content-Type':'application/json',
                Authorization: `Bearer ${token}`
            }})
        const data = await response.json()
        return data
    }
)

const  myOrdersSlice = createSlice({
    name: 'order',
    initialState: {loading: false, order: [], error: null},
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(myOrderList.pending, (state) => {
                state.loading = true;
                state.order = [];
                state.error = null;
            })
            .addCase(myOrderList.fulfilled, (state, action) =>{
                state.loading = false;
                state.order = action.payload;
                state.error = null;
            })
            .addCase(myOrderList.rejected, (state, action) => {
                state.loading = true;
                state.order = [];
                state.error = action.error.message;
            })
    }
});

export const myOrdersReducer = myOrdersSlice.reducer;