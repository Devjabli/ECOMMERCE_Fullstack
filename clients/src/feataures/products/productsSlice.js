import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


export const productList = createAsyncThunk(
  'products/productList',
  async () => {
    const response = await fetch(`/api/products/list/`);
    const data = await response.json();
    return data;
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState: { loading: false, products: [], error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(productList.pending, (state) => {
        state.loading = true;
        state.products = [];
        state.error = null;
      })
      .addCase(productList.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.page = action.payload;
        state.pages = action.payload;
        state.error = null;
      })
      .addCase(productList.rejected, (state, action) => {
        state.loading = false;
        state.products = [];
        state.error = action.error.message;
      });
  },
});

export const productsReducer = productsSlice.reducer;
