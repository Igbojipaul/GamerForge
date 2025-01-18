import axios from "axios";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const saveItem = createAsyncThunk(
  "forgeshop/saveItem",
  async (productId) => {
    try {
      const response = await axios.post(
        `https://gamerforge.onrender.com/api/shop/wishlist/add`,
        { productId },
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return error.response || "an error occured ";
    }
  }
);
export const fetchSavedItems = createAsyncThunk(
  "forgeshop/fetchSavedItems",
  async () => {
    try {
      const response = await axios.get(
        `https://gamerforge.onrender.com/api/shop/wishlist/get`,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return error || "an error occured ";
    }
  }
);

export const deleteSavedItem = createAsyncThunk(
  "forgeshop/deleteSavedItem",
  async (productId) => {
    try {
      const response = await axios.delete(
        `https://gamerforge.onrender.com/api/shop/wishlist/delete/${productId}`,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return error.response;
    }
  }
);

const initialState = {
  loading: false,
  savedItems: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(saveItem.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(saveItem.fulfilled, (state, action) => {
      state.loading = false;
      state.savedItems = action.payload.products;
    });
    builder.addCase(saveItem.rejected, (state) => {
      state.loading = false;
      state.savedItems = []
    });
    builder.addCase(fetchSavedItems.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchSavedItems.fulfilled, (state, action) => {
      state.loading = false;
      state.savedItems = action.payload.products;
    });
    builder.addCase(fetchSavedItems.rejected, (state) => {
      state.loading = false;
      state.savedItems = [];
    });
    builder.addCase(deleteSavedItem.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteSavedItem.fulfilled, (state, action) => {
      state.loading = false;
      state.savedItems = action.payload.products;
    });
    builder.addCase(deleteSavedItem.rejected, (state, action) => {
      state.loading = false;
      state.savedItems = []
    });
  },
});

export default wishlistSlice.reducer;

export const selectLoading = (state) => state.wishlist.loading;
export const selectSavedItems = (state) => state.wishlist.savedItems;
