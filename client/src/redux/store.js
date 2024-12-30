import { configureStore } from "@reduxjs/toolkit";

import authenticationSlice from "./slices/authentication";
import adminProductsSlice from "./slices/adminProducts"
import shoppingProductsSlice from "./slices/shopProduct"
import shopCartSlice from "./slices/shopCart"
import addressSlice from "./slices/address"
import OrderSlice from "./slices/order"
import SearchSlice from "./slices/search"
import WishlistSlice from "./slices/wishlist"


const store = configureStore({
      reducer: {
            auth: authenticationSlice ,
            products: adminProductsSlice,
            shoppingProducts: shoppingProductsSlice,
            cart: shopCartSlice,
            address: addressSlice,
            orders: OrderSlice,
            search: SearchSlice,
            wishlist: WishlistSlice
      }
})


export default store;