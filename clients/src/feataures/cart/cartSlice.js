import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: 'cart',
  initialState: { cartItems: [], shippingAddress: [], paymentMethod: {}  },
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x.id === item._id);

      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x.id === existItem._id ? item : x
        );
      } else {
        state.cartItems.push(item)
      }
    },
    removeFromCart: (state, action) => {
        state.cartItems = state.cartItems.filter(
            x => x.id !== action.payload
        )
    },
    incrementQty: (state, action) => {
      const {product} = action.payload
      const item = state.cartItems.find((x) => x.id === product);
      if (item) {
        item.qty += 1
      }
    },
    decrementQty: (state, action) => {
    const {product} = action.payload
    const item = state.cartItems.find((x) => x.id === product);
    if (item && item.qty > 1) {
      item.qty -= 1
    } else {
      state.cartItems = state.cartItems.filter(x => 
        x.id !== product
        )
    }

    },
    cartShippingAddress: (state, action) => {
      state.shippingAddress = action.payload
    },
    cartPaymentMethod: (state, action) => {
      state.paymentMethod = action.payload
    },
    emptyFromCart: (state) => {
      state.cartItems = []
    },
    emptyShippingAddress: (state) => {
      state.shippingAddress = []
    }
  },
});

export const {
  addToCart, 
  removeFromCart, 
  emptyFromCart,
  incrementQty, 
  decrementQty,
  cartShippingAddress,
  cartPaymentMethod,
  emptyShippingAddress
} = cartSlice.actions;
export default cartSlice.reducer;