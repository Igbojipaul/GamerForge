import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getSearchedProducts = createAsyncThunk(
  "product/fetch",
  async (keyword) => {
    try {
      const response = await axios.get(
        `https://gamerforge.onrender.com/api/shop/search/${keyword}`
      );
      return response.data;
    } catch (error) {
      console.log("an error occured");
    }
  }
);

const initialState = {
  loading: false,
  products: [],
  keyword: ""
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    resetKeyword: (state)=>{
      state.products = []
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getSearchedProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getSearchedProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload.products;
      
    });
    builder.addCase(getSearchedProducts.rejected, (state) => {
      state.loading = false;
      state.products = []
    });
  },
});


export default searchSlice.reducer

export const {resetKeyword} = searchSlice.actions

export const selectLoading = (state)=> state.search.loading
export const SelectProducts = (state)=> state.search.products
export const SelectKeyword = (state)=> state.search.keyword


