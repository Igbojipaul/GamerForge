import axios from "axios";

import { createSlice, createAsyncThunk }  from "@reduxjs/toolkit";

export const addToCart = createAsyncThunk(
  "product/addToCart",
  async ({ productId, quantity }) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/shop/cart/add`,
        { productId, quantity },
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return error.response || "an error occured ";
    }
  }
);
export const fetchCartItems = createAsyncThunk(
  "product/fetchCartItems",
  async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/shop/cart/get`,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return error || "an error occured ";
    }
  }
);
export const updateCartItem = createAsyncThunk(
  "product/updateCartItem",
  async ({ productId, quantity }) => {

    try {
      const response = await axios.put(
        `http://localhost:5000/api/shop/cart/update`,
        { productId, quantity },
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return error.response || "an error occured ";
    }
  }
);
export const deleteCartItem = createAsyncThunk(
  "product/deleteCartItem",
  async ( productId ) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/shop/cart/delete/${productId}`,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return error.response
    }
  }
);

const initialState = {
  loading: false,
  cart: [],
  cartId: null,
  error: null,
};

const shopCartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addToCart.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addToCart.fulfilled, (state, action) => {
      state.loading = false;
      state.cart = action.payload.data;
      state.cartId = action.payload.cartId
    });
    builder.addCase(addToCart.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(fetchCartItems.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCartItems.fulfilled, (state, action) => {

      state.loading = false;
      state.cart = action.payload.data;
      state.cartId = action.payload.cartId

    });
    builder.addCase(fetchCartItems.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(updateCartItem.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateCartItem.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(updateCartItem.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(deleteCartItem.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteCartItem.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(deleteCartItem.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default shopCartSlice.reducer;

export const selectLoading = (state)=>state.cart.loading
export const selectCartItems = (state)=>state.cart.cart
export const selectCartId = (state)=>state.cart.cartId


