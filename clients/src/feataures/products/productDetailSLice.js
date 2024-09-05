import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const productDetails =  createAsyncThunk(
    'products/productDetails',
    async (id) => {
        const response = await fetch(`/api/products/${id}/`)
        const data = await response.json()
        return data
    }
);

const productDetailSlice = createSlice({
    name: 'productDetails',
    initialState: { loading: false, product: [], error:null},
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(productDetails.pending, (state) => {
                state.loading = true;
                state.product = [];
                state.error = null
            })
            .addCase(productDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.product = action.payload;
                state.error = null
            })
            .addCase(productDetails.rejected, (state, action) => {
                state.loading = false;
                state.product = [];
                state.error = action.error.message
            })
    }
})

export const productDetailReducer = productDetailSlice.reducer;