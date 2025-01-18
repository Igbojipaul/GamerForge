import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";

export const addProduct = createAsyncThunk("product/add", async (formData, {rejectWithValue}) => {
  try {
    const response = await axios.post(
      "https://gamerforge.onrender.com/api/admin/products/add",
      formData,
      { withCredentials: true }
    );

    return response.data;
  } catch (error) {
    return rejectWithValue(
      error.response?.data?.message || "Something went wrong"
    );
  }
});
export const fetchAllProducts = createAsyncThunk("product/fetch", async ( ) => {
  try {
    const response = await axios.get(
      "https://gamerforge.onrender.com/api/admin/products/fetch",
      { withCredentials: true }
    );    
    return response.data;
  } catch (error) {
    return  error.response?.data?.message || "Something went wrong"
  }
});

export const updateProduct = createAsyncThunk("product/update", async ({id, formData}) => {

  console.log(formData);
  
  try {
    const response = await axios.put(
      `https://gamerforge.onrender.com/api/admin/products/update/${id}`,
      formData,
      { withCredentials: true }
    );

    return response.data;
  } catch (error) {
    return error.response?.data?.message || "Something went wrong"
  }
});

export const deleteProduct = createAsyncThunk("products/delete", async(id)=>{

  try {
    const response = await axios.delete(
      `https://gamerforge.onrender.com/api/admin/products/delete/${id}`,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    return error.response?.data?.message || "Something went wrong"
  }

})

const initialState = {
  products: [],
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder)=>{
      builder.addCase(addProduct.pending, (state) => {
            state.loading = true
      })     
      builder.addCase(addProduct.fulfilled, (state, action) => {
            state.loading = false;
      })     
      builder.addCase(addProduct.rejected, (state, action) => {
            state.loading = false,
            state.error = action.payload
      })     
      builder.addCase(fetchAllProducts.pending, (state) => {
            state.loading = true
      })     
      builder.addCase(fetchAllProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.products = action.payload.products            
      })     
      builder.addCase(fetchAllProducts.rejected, (state, action) => {
            state.loading = false,
            state.error = action.payload
      })     
      builder.addCase(updateProduct.pending, (state) => {
            state.loading = true
      })     
      builder.addCase(updateProduct.fulfilled, (state, action) => {
            state.loading = false;            
      })     
      builder.addCase(updateProduct.rejected, (state, action) => {
            state.loading = false,
            state.error = action.payload
      })     
      
  },
});

export const selectLoading = (state)=> state.products.loading
export const selectProducts = (state)=> state.products.products
export const selectError = (state)=> state.products.error


export default productSlice.reducer
