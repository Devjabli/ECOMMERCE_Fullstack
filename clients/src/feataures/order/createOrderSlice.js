import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const createOrder = createAsyncThunk(
    'order/createOrder',
    async (order, {getState}) => {
        const state = getState();
        const token = state.authUser.userInfo.token
        const response = await fetch('/api/orders/add/', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(order)
        })
        const data = await response.json()
        return data
    }
)

const createOrderSlice = createSlice({
    name: 'order',
    initialState: {loading: false, error:null},
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createOrder.pending, (state) => {
                state.loading = true;
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.order = action.payload;
                state.error = null;
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message
            })
    }
})

export const createOrderReducer = createOrderSlice.reducer;