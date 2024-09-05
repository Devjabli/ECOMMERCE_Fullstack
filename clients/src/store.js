import { configureStore } from '@reduxjs/toolkit';
import {productsReducer}  from './feataures/products/productsSlice';
import cartReducer from './feataures/cart/cartSlice'
import { productDetailReducer } from './feataures/products/productDetailSLice';
import wishReducer from './feataures/cart/wishSlice';
import { authUserReducer } from './feataures/users/authUserSlice';
import { myOrdersReducer } from './feataures/order/listOrderSlice';

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];

const itemListFromStorage = localStorage.getItem('itemList')
  ? JSON.parse(localStorage.getItem('itemList'))  
  : []

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : []

const paymentMethodFromStorage = localStorage.getItem('paymentMethod')
  ? JSON.parse(localStorage.getItem('paymentMethod'))
  : {}  

const authUserInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : []  

const store = configureStore({

    reducer: {
        cart: cartReducer,
        authUser: authUserReducer,
        products: productsReducer,
        productDetails: productDetailReducer,
        wish: wishReducer,
        orderUser: myOrdersReducer
    },
    
    preloadedState: {
        authUser: {
          userInfo: authUserInfoFromStorage
        },
        cart: {
            cartItems: cartItemsFromStorage,
            shippingAddress: shippingAddressFromStorage,
            paymentMethod: paymentMethodFromStorage
        },
        wish: {
            itemList: itemListFromStorage
        }
    }

})

export default store