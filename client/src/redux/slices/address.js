import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";

export const fetchAddresses = createAsyncThunk("address/fetch", async () => {
  try {
    const response = await axios.get(
      "http://localhost:5000/api/shop/address/get-addresses",
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    return error.data
  }
});
export const addAddress = createAsyncThunk("address/add", async (formData) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/shop/address/add-address",
      formData,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
});
export const updateAddress = createAsyncThunk(
  "address/update",
  async ( {formData, id} ) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/shop/address/update-address/${id}`,
        formData,
        {withCredentials: true}

      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const deleteAddress = createAsyncThunk(
  "address/delete",
  async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/shop/address/delete-address/${id}`,     {withCredentials: true}

      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const initialState = {
  loading: false,
  address: [],
};

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAddresses.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAddresses.fulfilled, (state, action) => {      
      state.loading = false;
      state.address = action.payload?.address;
    });
    builder.addCase(fetchAddresses.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(addAddress.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addAddress.fulfilled, (state, action) => {
      state.loading = false;
      state.address = action.payload?.address;
    });
    builder.addCase(addAddress.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(updateAddress.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateAddress.fulfilled, (state, action) => {
      
      state.loading = false
      state.address = action.payload?.address;
    });
    builder.addCase(updateAddress.rejected, (state) => {
      state.loading = false
    });
    builder.addCase(deleteAddress.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteAddress.fulfilled, (state, action) => {
      
      state.loading = false;
      state.address = action.payload?.addresses;
    });
    builder.addCase(deleteAddress.rejected, (state) => {
      state.loading = false
    });
  },
});

export default addressSlice.reducer;

export const selectAddress = (state) => state.address.address;
export const selectLoading = (state) => state.address.loading;
