import { configureStore } from '@reduxjs/toolkit'
import productReducer from '../slices/productSlice'
import cartReducer from '../slices/cartSlice'
import userReducer from '../slices/userSlice'
import wishlistReducer from '../slices/wishlistSlice'

export const store = configureStore({
    reducer: {
        product: productReducer,
        cart: cartReducer,
        user: userReducer,
        wishlist: wishlistReducer
    }
})