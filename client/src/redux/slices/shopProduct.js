import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const buildQueryString = (params) => {
  const query = new URLSearchParams();
  for (const key in params) {
    if (params[key]?.length) {
      params[key].forEach((item) => query.append(key, item)); 
    }
  }
  return query.toString();
};

export const fetchFilteredProducts = createAsyncThunk(
  "product/fetch",
  async (queryParams) => {
    try {
      const query = buildQueryString(queryParams);
      

      const response = await axios.get(
        `http://localhost:5000/api/shop/products/fetch?${query}`,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Something went wrong");
    }
  }
);
export const fetchProductDetails = createAsyncThunk(
  "product/details",
  async (id) => {
    try {
      

      const response = await axios.get(
        `http://localhost:5000/api/shop/products/fetch/${id}`,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Something went wrong");
    }
  }
);

const initialState = {
  loading: false,
  products: [],
  product: null
};

const shopProductSlice = createSlice({
  name: "shoppingProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchFilteredProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchFilteredProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload.products;
    });
    builder.addCase(fetchFilteredProducts.rejected, (state, action) => {
      state.loading = false;
      console.error(action.error.message);
    });
    builder.addCase(fetchProductDetails.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchProductDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.product = action.payload.data;
    });
    builder.addCase(fetchProductDetails.rejected, (state, action) => {
      state.loading = false;
      console.error(action.error.message);
    });
  },
});

export const selectLoading = (state) => state.shoppingProducts.loading;
export const selectProducts = (state) => state.shoppingProducts.products;
export const selectProduct = (state) => state.shoppingProducts.product;
export default shopProductSlice.reducer;
