import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const initiatePayment = createAsyncThunk(
  "/order/initiatePayment",
  async (orderData) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/shop/order/initiatePayment",
        orderData,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {}
  }
);

const initialState = {
  isLoading: false,
  orderId: null,
  approvalUrl: null,
  orderDetails: null,
  orderList: [],
};

const OrderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(initiatePayment.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(initiatePayment.fulfilled, (state, action) => {
      state.isLoading = false;
      state.approvalUrl = action.payload.approvalUrl;
      state.orderId = action.payload.orderId;
    });
    builder.addCase(initiatePayment.rejected, (state) => {
      state.isLoading = false;
      state.approvalUrl = null;
      state.orderId = null;
    });
  },
});

export const selectLoading = (state)=> state.orders.isLoading
export const selectApprovalUrl = (state)=> state.orders.approvalUrl
export const selectOrderId = (state)=> state.orders.orderId
export const selectOrderList = (state)=> state.orders.orderList
export const selectDetails = (state)=> state.orders.orderDetails

export default OrderSlice.reducer;
